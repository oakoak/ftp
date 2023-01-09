package org.oak.ftpbackend.controllers;

import org.oak.ftpbackend.FileDTO;
import org.oak.ftpbackend.FileService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.util.List;



@RestController
@CrossOrigin("http://localhost:4200")
@RequestMapping("/api")
public class FileController {
    private FileService fileService;
    public static Logger logger = LoggerFactory.getLogger(FileController.class);

    public String wrapperMessage(String message) {
        return "{\"message\":\"%s\"}".formatted(message);
    }

    FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @GetMapping("/folder")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public List<FileDTO> read(@RequestParam(value = "path", defaultValue = "/home") String path) {
        logger.info("Read folder data for ");
        return fileService.getListFiles(path);
    }

    @GetMapping("/file")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity<Resource> loadFile(@RequestParam(value = "path") String fileName) {
        Resource file = fileService.load(fileName);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION,
                        "attachment; filename=\"" + file.getFilename() + "\"")
                .body(file);
    }

    @PutMapping("/file")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity uploadFile(@RequestParam(value = "path") String folder,
                                     @RequestParam("file") MultipartFile file) {
        try {
            fileService.save(file, folder);
            String message = "File %s successful upload to %s".formatted(file.getName(), folder);
            logger.info(message);
            return ResponseEntity.ok(wrapperMessage(message));
        }
        catch (IOException e) {
            String message = "Failed upload file %s".formatted(file.getName());
            logger.error(message, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(wrapperMessage(message));
        }
    }

    @PostMapping("/deletefile")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity deleteFile(@RequestParam(value = "path") String fileName) {

        boolean result = fileService.delete(fileName);
        if (result) {
            String message = "File %s successful delete".formatted(fileName);
            logger.info(message);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(wrapperMessage(message));
        }
        String message = "Failed delete file %s".formatted(fileName);
        logger.error(message);
        return ResponseEntity.status(HttpStatus.FORBIDDEN)
                .body(wrapperMessage(message));
    }

    @PostMapping("/movefile")
    @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
    public ResponseEntity moveFile(@RequestParam(value = "source") String source,
                         @RequestParam(value = "target") String target) {
        logger.info("Moves file from {} to {}", source, target);
        try {
            Path result = fileService.move(source, target);
            String message = "File %s successful move to %s".formatted(result.getFileName(), result.getParent());
            logger.info(message);
            return ResponseEntity.status(HttpStatus.OK)
                    .body(wrapperMessage(message));
        }
        catch (IOException e) {
            logger.error(e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.FORBIDDEN)
                    .body(wrapperMessage("Error"));
        }
    }
}


