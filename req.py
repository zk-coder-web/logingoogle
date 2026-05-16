import requests

url = input("Insira a URL (ex: https://verifyig.onrender.com): ").strip()

username = input("Insira o usuário: ").strip()

# monta endpoint
endpoint = f"{url}/check/{username}"

try:
    response = requests.get(endpoint, timeout=10)

    print("\nResposta da API:\n")
    print(response.json())

except requests.exceptions.RequestException as e:
    print("Erro na requisição:", e)