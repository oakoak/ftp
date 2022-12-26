package org.oak.ftpbackend;

import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("http://10.0.0.33:16000")
public class FileController {
    private  static final FileService fileService = new LocalFileService();

    @RequestMapping("/files")
    public List<FileDTO> read(@RequestParam(value = "path", defaultValue = "/home") String path) {
        System.out.println(fileService.getListFiles(path));
        return fileService.getListFiles(path);
    }

    @RequestMapping("/file")
    public ResponseEntity<Resource> uploadFile(@RequestParam(value = "path") String fileName) {
        Resource file = fileService.load(fileName);
        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=\"" + file.getFilename() + "\"").body(file);
    }
}


