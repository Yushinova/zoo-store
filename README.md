Комплекс приложений для интернет магазина Зоотоваров
api - asp.net core 9
admin, store - next.js
Данные из .env.local будут доступны до 01.03.2026

1-Запустить контейнеры в докере
docker-compose up -d

2-Сделать Update-Database (через Visual Studio открыть api и в консоле диспетчера пакетов 
выполнить Update-Database), поменяв в appsettings.json подключение на "LocalConnection"
Для работы приложения в докере необходимо подключение "DockerizedConnection"

3-Открывать приложения admin и store следует в разных браузерах или в разных окнах, так как на localhost
будет конфликт куков. В релизе приложения будут на разных доменах

4-При тестировании приложений входить с данными 
Админ
логин:admin
пароль:admin123

Юзер
телефон: +7(999)123-45-67
пароль: user123

5-Документация и тестирование api http://localhost:8080/docs

Если нет Docker. 
1-Создайте локальную или облачную базу данных Postgres
2-Пропишите строку подключения в appsettings.json
3-Сделайте Update-Database
4-Запустите проект api через Visual Studio
5-Проверить работу http://localhost:5027/docs
6-Установите зависимости в Next.js проекты npm install
7-Поменять в .env.local NEXT_PUBLIC_API_URL=http://localhost:8080 на  http://localhost:5027
7-Соберите Next.js  npm run build
8-Запустите проекты npm start или npm run dev(разработка)




