#!/bin/bash
# scan_sensitive.sh
# Este script recorre todos los archivos de texto del repositorio, excluyendo ciertos directorios y archivos irrelevantes,
# y busca patrones que puedan indicar la presencia de datos sensibles.

# Lista de patrones ampliada:
PATTERNS="password|secret|key|token|credential|apikey|private|miner-coinbase|ethstats|PleaseChangeThisEthstatsSecret|-----BEGIN CERTIFICATE-----|-----BEGIN PRIVATE KEY-----|[A-Za-z0-9+/]{20,}={0,2}|passphrase|auth"

echo "Iniciando escaneo para datos sensibles..."
echo "Patrones a buscar: $PATTERNS"
echo "---------------------------------------------------"

# Exclusiones: Directorios y archivos irrelevantes
EXCLUDED_PATHS=(
    "./node_modules/*"
    "./artifacts/*"
)

EXCLUDED_FILES="package.json|package-lock.json"

# Construir exclusión de `find`
FIND_CMD="find . -type f"
for path in "${EXCLUDED_PATHS[@]}"; do
    FIND_CMD+=" ! -path \"$path\""
done

# Ejecutar búsqueda
eval "$FIND_CMD" | while read -r file; do
    # Excluir archivos específicos irrelevantes
    if [[ $file =~ $EXCLUDED_FILES ]]; then
        continue
    fi

    # Verifica si el archivo es de texto
    if file "$file" | grep -qiE 'text|ASCII|source'; then
        echo "Escaneando: $file"
        # Realiza la búsqueda de patrones, imprimiendo líneas y números de línea en caso de coincidencias
        grep -HinE "$PATTERNS" "$file" && echo "------------------------------"
    fi
done

echo "Escaneo completado."
