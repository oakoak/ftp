package org.oak.ftpbackend.repository;

import org.oak.ftpbackend.models.FileDTO;
import org.springframework.core.io.Resource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Path;
import java.util.List;


public interface FileService {
    List<FileDTO> getListFiles(String path);

    boolean save(MultipartFile file, String folder) throws IOException;

    Resource load(String filename);

    Path move(String source, String target) throws IOException;

    boolean delete(String fileName);
}
