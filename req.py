import requests

base_url = "https://verifyig.onrender.com"

username = input("Insira o usuário: ").strip()

url = f"{base_url}/check/{username}"

try:
    r = requests.get(url, timeout=10)
    print("\nResposta da API:\n")
    print(r.json())

except Exception as e:
    print("Erro na requisição:", e)