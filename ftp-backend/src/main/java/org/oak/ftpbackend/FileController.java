package org.oak.ftpbackend;

import org.oak.ftpbackend.FileDTO;
import org.oak.ftpbackend.FileService;
import org.oak.ftpbackend.LocalFileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;


import java.util.List;


@RestController
@CrossOrigin(origins = "http://localhost:4200/")
public class FileController {
    private  static FileService fileService;

    public FileController( ) {
        this.fileService = new LocalFileService();
    }

    @RequestMapping("/files")
    public List<FileDTO> read(@RequestParam(value = "path", defaultValue = "/home") String path) {
        List<FileDTO> tmp = fileService.getFile(path);
        System.out.println(tmp);
        return tmp;
    }
}


