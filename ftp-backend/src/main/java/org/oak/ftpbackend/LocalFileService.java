package org.oak.ftpbackend;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.util.ArrayList;
import java.util.List;


@Service
public class LocalFileService implements FileService{
    @Override
    public List<FileDTO> getListFiles(String path) {
        File[] listFiles = new File(path).listFiles();

        List<FileDTO> tmpListFile = new ArrayList<>(listFiles.length);

        for (File i: listFiles) {
            tmpListFile.add(new FileDTO(i.getName(), i.isDirectory(), i.getPath(), i.length(), i.lastModified()));
        }
        return tmpListFile;
    }

    @Override
    public boolean save(MultipartFile file, String folder) {
        try {
            File tmpFile = new File(folder + '/' + file.getOriginalFilename());
            file.transferTo(tmpFile);
            return true;
        }
        catch (IOException e) {
            System.out.println(e);
        }
        return false;
    }

    @Override
    public Resource load(String fileName) {
        try {
            Path file = Path.of(fileName);
            Resource resource = new UrlResource(file.toUri());

            if (!resource.exists() || !resource.isFile()) {
                throw new RuntimeException("Could not read the file!");
            }
            return resource;
        } catch (MalformedURLException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @Override
    public Path move(String source, String target) {
        try {
            return Files.move(Path.of(source), Path.of(target));
        }
        catch (IOException e) {
            throw new RuntimeException("Error: " + e.getMessage());
        }
    }

    @Override
    public boolean delete(String fileName) {
        File file = new File(fileName);
        if (!file.exists()) {
            throw new RuntimeException("Could not read the file or folder!");
        }
        return file.delete();
    }
}

