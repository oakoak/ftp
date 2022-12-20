package org.oak.ftpbackend;

import java.util.List;


public interface FileService {
    List<FileDTO> getFile(String path);
}
