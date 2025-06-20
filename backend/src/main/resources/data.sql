INSERT INTO tb_sectors (id, name)
VALUES
    (1, 'Qualidade'),
    (2, 'Produção'),
    (3, 'Estoque');

INSERT INTO user (id, name, email, password, profile, id_sector)
VALUES
    (1, 'João Auditor', 'joao.auditor@email.com', '{noop}senha123', 'ADMIN', NULL),
    (2, 'Maria Colaboradora', 'maria.colab@email.com', '{noop}senha456', 'SECTOR', 1);

INSERT INTO more_ideas (
    id, nome_usuario, email_usuario, setor, descricao_problema, possiveis_solucoes,
    imagem_path, interferencia_atividades, expectativa_melhoria, sugestao_nome_kaizen,
    data_hora_envio, status
)
VALUES (
           1, 'Maria Colaboradora', 'maria.colab@email.com', 'Qualidade',
           'Falta de organização no setor', 'Padronização dos armários',
           '/uploads/maisideias/exemplo.jpg', 'Pouca', 'Reduzir tempo perdido com buscas',
           'Melhoria visual no local', '2025-06-20 01:00:00', 'ENVIADO'
       );

INSERT INTO audit (
    id, audit_date_time, id_user, imagem_path
)
VALUES (
           1, '2025-06-20 01:05:00', 1, '/uploads/auditorias/auditoria1.jpg'
       );

INSERT INTO audited_area (
    id, nome_area, status, nota_final, audit_id
)
VALUES
    (1, 'Estoque', 'CONCLUIDO', 9.0, 1),
    (2, 'Produção', 'PENDENTE', 6.5, 1);