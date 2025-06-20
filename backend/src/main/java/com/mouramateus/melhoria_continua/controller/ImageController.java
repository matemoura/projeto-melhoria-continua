package com.mouramateus.melhoria_continua.controller;

import org.springframework.core.io.Resource;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.net.MalformedURLException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

@RestController
@RequestMapping("/api/image")
public class ImageController {

    @Value("${file.upload-dir}")
    private String uploadDir;

    @PostMapping("/moreideas/upload")
    public ResponseEntity<String> uploadImageMoreIdeas(@RequestParam("file") MultipartFile file) {
        return saveFile(file, "moreideas");
    }

    @PostMapping("/auditoria/upload")
    public ResponseEntity<String> uploadImagemAudit(@RequestParam("file") MultipartFile file) {
        return saveFile(file, "audit");
    }

    @GetMapping("/{pasta}/{nomeArquivo}")
    public ResponseEntity<Resource> getImage(
            @PathVariable String pasta,
            @PathVariable String nomeArquivo) {

        try {
            Path caminho = Paths.get(uploadDir + "/" + pasta + "/" + nomeArquivo);
            Resource recurso = new UrlResource(caminho.toUri());

            if (recurso.exists() && recurso.isReadable()) {
                return ResponseEntity.ok()
                        .contentType(MediaType.IMAGE_JPEG)
                        .body(recurso);
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }

        } catch (MalformedURLException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    private ResponseEntity<String> saveFile(MultipartFile file, String pasta) {
        try {
            Path diretorio = Paths.get(uploadDir + "/" + pasta);
            if (!Files.exists(diretorio)) {
                Files.createDirectories(diretorio);
            }

            String nomeArquivo = System.currentTimeMillis() + "_" + file.getOriginalFilename();
            Path caminhoCompleto = diretorio.resolve(nomeArquivo);
            file.transferTo(caminhoCompleto.toFile());

            String urlAcesso = "/uploads/" + pasta + "/" + nomeArquivo;
            return ResponseEntity.ok(urlAcesso);

        } catch (IOException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Erro ao salvar imagem: " + e.getMessage());
        }
    }
}
