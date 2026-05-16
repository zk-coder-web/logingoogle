import subprocess

comandos = [
    ["git", "add", "."],
    ["git", "commit", "-m", "verify - New Commit"],
    ["git", "branch", "-M", "main"],
    ["git", "push", "-u", "origin", "main"]
]

for comando in comandos:
    print(f"\nExecutando: {' '.join(comando)}\n")

    resultado = subprocess.run(
        comando,
        capture_output=True,
        text=True,
        shell=True
    )

    print(resultado.stdout)

    if resultado.stderr:
        print(resultado.stderr)