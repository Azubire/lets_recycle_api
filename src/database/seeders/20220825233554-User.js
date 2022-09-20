"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert("users", [
      {
        name: "Azubire Peter",
        email: "azubirepeter@gmail.com",
        password:
          "$2a$10$Zak18iS1FRUnGvS78odhSu8nAfA8pxX5aVqn1r7uXyDq8OvZHznDu",
        coverImg: "avatar-1661392709327-958885889.jpg",
        profileImg: "avatar-1661387823062-130330865.webp",
        country: "Ghana",
        region: "Upper East",
        city: "Bolga",
      },
      {
        name: "John Doe",
        email: "azubirepeter@gmail.com",
        password:
          "$2a$10$Zak18iS1FRUnGvS78odhSu8nAfA8pxX5aVqn1r7uXyDq8OvZHznDu",
        coverImg: "avatar-1661392709327-958885889.jpg",
        profileImg: "avatar-1661387823062-130330865.webp",
        country: "Ghana",
        region: "Upper East",
        city: "Bolga",
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete("users");
  },
};
