package org.oak.ftpbackend;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:4200/")
public class FileController {
    private  static final FileService fileService = new LocalFileService();;

    @RequestMapping("/files")
    public List<FileDTO> read(@RequestParam(value = "path", defaultValue = "/home") String path) {
        return fileService.getListFiles(path);
    }

    @RequestMapping("/file")
    public List<FileDTO> uploadFile(@RequestParam(value = "path") String path) {
        return fileService.getListFiles(path);
    }
}


