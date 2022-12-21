package org.oak.ftpbackend;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.oak.ftpbackend.FileDTO;
import org.oak.ftpbackend.FileService;
import org.oak.ftpbackend.LocalFileService;
import org.springframework.web.bind.annotation.*;

import com.fasterxml.jackson.*;


import java.util.List;


@RestController
@CrossOrigin("http://localhost:4200/")
public class FileController {
    private  static final FileService fileService = new LocalFileService();;

    private static final ObjectMapper objectMapper = new ObjectMapper();;

    public FileController( ) {
    }

    @RequestMapping("/files")
    public List<FileDTO> read(@RequestParam(value = "path", defaultValue = "/home") String path) throws JsonProcessingException {
        return fileService.getFile(path);
    }
}


