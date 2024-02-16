# api_key_sample
Keycloakを利用した、APIKey認証サンプル  

# 環境
- Node
- docker
- docker-compose

# サーバ起動
- docker-compose up -d
- localhost:8080にブラウザでアクセスし、ClientをClient AuthenticatorをClient Id and Secretで作成する
- cd server
- yarn
- yarn dev

# クライアント
- cd client
- src/index.tsにClientIdとClientSecretを設定する
- yarn
- yarn dev

# 備考
ClientIdとClientSecretをクライアントで、":"でマージしてBase64でエンコードしてヘッダーに入れているが、実際に利用する際はあらかじめBase64でエンコードした値を連携する方が良い。
