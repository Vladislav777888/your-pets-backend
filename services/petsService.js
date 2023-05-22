const { Pet } = require("../models");

exports.getAllPets = async (userId, { skip = 0, limit = 2 }) => {
  try {
    const total = await Pet.find({ owner: userId }).count();
    const pets = await Pet.find({ owner: userId })
      .populate("owner", "_id name email")
      .select({ __v: 0 })
      .skip(skip)
      .limit(limit);

    return { pets, total };
  } catch (error) {
    console.log(error);
  }
};

exports.addPet = async (body, userId) => {
  try {
    const newPet = await Pet.create({ ...body, owner: userId });

    return newPet;
  } catch (error) {
    console.log(error);
  }
};

exports.removePet = async (petId, userId) => {
  try {
    return await Pet.findOneAndDelete({ _id: petId, owner: userId });
  } catch (error) {
    console.log(error);
  }
};
