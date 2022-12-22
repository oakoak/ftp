package org.oak.ftpbackend;

import java.io.File;
import java.util.ArrayList;
import java.util.List;

public class LocalFileService implements FileService{
    @Override
    public List<FileDTO> getListFiles(String path) {
        File folder = new File(path);

        List<FileDTO> tmpListFile = new ArrayList<>(folder.listFiles().length);

        for (File i: folder.listFiles()) {
            tmpListFile.add(new FileDTO(i.getName(), i.isDirectory(), i.getPath(), i.getUsableSpace()));
        }
        return tmpListFile;
    }
}

