package org.oak.ftpbackend;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:4200")
public class FileController {
    private  FileService fileService;

    FileController(FileService fileService) {
        this.fileService = fileService;
    }

    @GetMapping("/folder")
    public List<FileDTO> read(@RequestParam(value = "path", defaultValue = "/home") String path) {
        return fileService.getListFiles(path);
    }

    @GetMapping("/file")
    public ResponseEntity<Resource> loadFile(@RequestParam(value = "path") String fileName) {
        Resource file = fileService.load(fileName);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }

    @PutMapping("/file")
    public void uploadFile(@RequestParam(value = "path") String folder, @RequestParam("file") MultipartFile file) throws IOException {
        fileService.save(file, folder);
    }

    @PostMapping("/deletefile")
    public void deleteFile(@RequestParam(value = "path") String fileName) {
        System.out.println(fileName);
        fileService.delete(fileName);
    }

    @PostMapping("/movefile")
    public void moveFile(@RequestParam(value = "source") String source,
                         @RequestParam(value = "target") String target) throws IOException {
        System.out.println(source + " " + target);
        fileService.move(source, target);
    }
}


