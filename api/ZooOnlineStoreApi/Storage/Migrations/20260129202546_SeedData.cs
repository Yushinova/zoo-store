using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ZooOnlineStoreApi.Storage.Migrations
{
    /// <inheritdoc />
    public partial class SeedData : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Категории
            migrationBuilder.InsertData(
                table: "Categories",
                columns: new[] { "Id", "Name" },
                values: new object[,]
                {
                    { 1, "Сухой корм" },
                    { 2, "Влажный корм" },
                    { 3, "Уход и гигиена" },
                    { 4, "Аптека" },
                    { 5, "Клетки и домики" }
                });

            // Типы животных
            migrationBuilder.InsertData(
                table: "PetTypes",
                columns: new[] { "Id", "Name", "ImageName" },
                values: new object[,]
                {
                    { 1, "Собаки", "products/f5d92ddd-5d50-4053-a26d-b32d36db44b6.png" },
                    { 2, "Кошки", "products/09dd191a-ac0f-4d51-a2e7-5f12050d03ad.png" },
                    { 3, "Птицы", "products/49a3075d-c2a1-4b84-a8e0-1521aab27f6f.png" },
                    { 4, "Рыбки", "products/d6897c22-94b3-491a-b2c0-9ec067814f7c.png" }
                });

            // Связи категорий и типов (если есть промежуточная таблица)
            // Для таблицы CategoryPetType
            migrationBuilder.InsertData(
                table: "CategoryPetType",
                columns: new[] { "CategoriesId", "PetTypesId" },
                values: new object[,]
                {
                    { 1, 1 },
                    { 1, 2 },
                    { 2, 1 },
                    { 2, 2 },
                    { 3, 1 },
                    { 3, 2 },
                    { 3, 3 },
                    { 3, 4 },
                    { 4, 1 },
                    { 4, 2 },
                    { 4, 3 }
                });

            // Продукты
            migrationBuilder.InsertData(
                table: "Products",
                columns: new[] { "Id", "Name", "Description", "Price", "CostPrice", "Quantity", "Brand", "isPromotion", "isActive", "CategoryId", "Rating" },
                values: new object[,]
                {
                    {
                        1,
                        "Сухой корм AWARD для взрослых собак всех пород с ягненком с индейкой 2 кг",
                        "Корм изготовлен из 100% натуральных ингредиентов по инновационной формуле — это обеспечивает комплексную нутрицевтическую поддержку организма питомца",
                        2500.00m,
                        1800.00m,
                        50,
                        "AWARD",
                        false,
                        true,
                        1,
                        0
                    },
                    {
                        2,
                        "Сухой корм для кошек \"Wiskas\"",
                        "Полнорационный сухой корм для взрослых кошек всех пород",
                        1500.00m,
                        1000.00m,
                        100,
                        "Wiskas",
                        true,
                        true,
                        1,
                        0
                    },
                    {
                        3,
                        "Влажный корм для собак Родные Корма, говяжьи кусочки в соусе по-хански, 6 х 410 г",
                        "Питомец Вашей Семьи Заслуживает Лучшего! Попробуйте наши натуральные мясные консервы отличного вкуса и непревзойденного качества. Полнорационный консервированный корм для собак от бренда Родные корма – это 75% мяса и мясных ингредиентов в каждом кусочке!! Нежная консистенция кусочков идеальна для собак мелких и средних пород.",
                        800.00m,
                        500.00m,
                        100,
                        "Родные корма",
                        false,
                        true,
                        2,
                        0
                    },
                    {
                        4,
                        "Влажный корм для стерилизованных кошек Perfect Fit паштет с индейкой 28 шт х 75 г",
                        "Влажный корм для стерилизованных кошек Perfect Fit паштет с индейкой. Состав: мясо и субпродукты (в том числе индейка), загустители, аминокислоты (в том числе метионин и таурин), минеральные вещества, рисовая мука, витамины, ксилоза, подсолнечное масло, L-карнитин",
                        1200.00m,
                        800.00m,
                        50,
                        "Perfect Fit",
                        false,
                        true,
                        2,
                        0
                    }
                });

            // Связи продуктов и типов животных
            migrationBuilder.InsertData(
                table: "PetTypeProduct",
                columns: new[] { "PetTypesId", "ProductsId" },
                values: new object[,]
                {
                    { 1, 1 },
                    { 1, 3 },
                    { 2, 2 },
                    { 2, 4 }
                });

            // Картинки продуктов
            migrationBuilder.InsertData(
                table: "ProductImages",
                columns: new[] { "Id", "ImageName", "AltText", "ProductId" },
                values: new object[,]
                {
                    { 1, "products/fc176f2c-61e9-4b49-a345-9ab0c90456b1.jpg", "6861821437.jpg", 1 },
                    { 2, "products/37228830-473a-44a8-b01a-6a5a18c01bf1.jpg", "wiskasDry", 2 },
                    { 3, "products/3a832cb7-2205-4277-b0b4-43ee12ab3028.jpg", "4rewpc13q2.jpg", 3 },
                    { 4, "products/92894b56-f3c3-4f39-8cfa-c3e0cdffddcc.png", "8253739220.png", 4 }
                });

            migrationBuilder.InsertData(
                table: "Admins",
                columns: new[] { "Id", "Name", "Login", "Password", "Role", "RegisteredAt" },
                values: new object[,]
                {
                    {
                        1,
                        "Admin",
                        "admin",
                        "$2a$12$ncjskFMRG08WaoGrZkXhGe6BaMdg20m47R694hiccBlP.dTFewZGK", // хеш пароля "admin123"
                        "admin",
                        new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc)
                    }
                });

            migrationBuilder.InsertData(
                table: "Users", // или как называется таблица пользователей
                columns: new[] { "Id", "UUID", "Name", "Phone", "Password", "Discont", "Email", "RegisteredAt", "TotalOrders" },
                values: new object[,]
                {
                    {
                        1,
                        Guid.NewGuid(), // или конкретный Guid: Guid.Parse("12345678-1234-1234-1234-123456789012")
                        "Test",
                        "+7(999)123-45-67",
                        "$2a$12$ncjskFMRG08WaoGrZkXhGelTvFu6KTBjMgWO.Cy2eAmH9v7wwuQPa", // хеш пароля "user123"
                        0,
                        "test@example.com",
                       new DateTime(2025, 1, 1, 0, 0, 0, 0, DateTimeKind.Utc),
                        0
                    }
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Удаляем в обратном порядке (из-за foreign keys)
            migrationBuilder.DeleteData(
                table: "ProductImages",
                keyColumn: "Id",
                keyValues: new object[] { 1, 2, 3, 4 });

            migrationBuilder.DeleteData(
                table: "PetTypeProduct",
                keyColumns: new[] { "PetTypesId", "ProductsId" },
                keyValues: new object[,]
                {
                    { 1, 1 },
                    { 1, 3 },
                    { 2, 2 },
                    { 2, 4 }
                });

            migrationBuilder.DeleteData(
                table: "Products",
                keyColumn: "Id",
                keyValues: new object[] { 1, 2, 3, 4 });

            migrationBuilder.DeleteData(
                table: "CategoryPetType",
                keyColumns: new[] { "CategoriesId", "PetTypesId" },
                keyValues: new object[,]
                {
                    { 1, 1 }, { 1, 2 }, { 2, 1 }, { 2, 2 }, { 3, 1 }, { 3, 2 }, { 3, 3 }, { 3, 4 }, { 4, 1 }, { 4, 2 }, { 4, 3 }
                });

            migrationBuilder.DeleteData(
                table: "PetTypes",
                keyColumn: "Id",
                keyValues: new object[] { 1, 2, 3, 4 });

            migrationBuilder.DeleteData(
                table: "Categories",
                keyColumn: "Id",
                keyValues: new object[] { 1, 2, 3, 4, 5 });
        }
    }
}

