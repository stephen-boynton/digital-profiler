const _ = require("lodash");
const knex = require("knex")({
  client: "sqlite3",
  useNullAsDefault: true,
  connection: {
    filename: "./crime.db"
  }
});

async function createCrimeSource() {
  await knex.schema.createTable("crime_source", table => {
    console.log("Build!");
    table.increments();

    table.string("victim_last_name");
    table.string("victim_first_name");
    table.boolean("victim_high_risk");
    table.integer("victim_age");
    table.string("victim_sex");
    table.string("victim_race");
    table.string("victim_ethnicity");

    table.string("relationship_to_victim");

    table.string("perpetrator_last_name");
    table.string("perpetrator_first_name");
    table.boolean("perpetrator_repeate_offender");
    table.integer("perpetrator_age");
    table.string("perpetrator_sex");
    table.string("perpetrator_race");
    table.string("perpetrator_ethnicity");

    table.date("date_of_crime");
    table.string("location");
    table.string("state");
    table.string("county");
    table.string("city");
    table.string("associated_crime");
    table.string("weapon");

    table.timestamps();
  });
}

async function tenHere() {
  const ten = await knex("info")
    .select("Weapon")
    .groupBy("Weapon")
    .count("Weapon")
    .orderByRaw(`COUNT(Weapon) DESC`)
    .then(info => info);

  console.log(ten);
}

async function getDataByVictim({ sex, age, race, weapon }) {
  return knex("info")
    .select("*")
    .where({
      VictimSex: sex,
      VictimAge: age,
      VictimRace: race,
      Weapon: weapon
    })
    .then(info => info);
}

async function getDataWithoutWeapon({ sex, age, race }) {
  return knex("info")
    .select("*")
    .where({
      VictimSex: sex,
      VictimAge: age,
      VictimRace: race
    })
    .then(info => info);
}

function calculateSuspectAge(listData) {
  const susAgeList = _.without(_.flatMap(listData, "PerpetratorAge"), "0");
  susAgeList.forEach((elm, ind, arr) => {
    arr[ind] = parseInt(elm);
  });
  return _.round(_.mean(susAgeList));
}

function calculateSuspectSex(listData) {
  const susSexList = _.without(
    _.flatMap(listData, "PerpetratorSex"),
    "Unknown"
  );

  const countObj = susSexList.reduce((obj, elm) => {
    obj[elm] = obj[elm] === undefined ? 1 : obj[elm] + 1;
    return obj;
  }, {});

  const { Male: male = 0, Female: female = 0 } = countObj;

  return male > female ? "Male" : "Female";
}

function calculateRelationship(listData) {
  const relationList = _.without(
    _.flatMap(listData, "Relationship"),
    "Unknown"
  );

  const countObj = relationList.reduce((obj, elm) => {
    obj[elm] = obj[elm] === undefined ? 1 : obj[elm] + 1;
    return obj;
  }, {});

  const likelyRelationList = Object.keys(countObj);

  return Object.keys(
    likelyRelationList.reduce(
      (obj, elm, ind, arr) => {
        const current = Object.keys(obj)[0];
        if (countObj[elm] > obj[current]) {
          obj[elm] = countObj[elm];
          delete obj[current];
          return obj;
        }
        return obj;
      },
      { result: 0 }
    )
  )[0];
}

async function getProbableWeapon(victim) {
  const listData = await getDataWithoutWeapon(victim);
  const weaponList = _.without(_.flatMap(listData, "Weapon"), "Unknown");

  const countObj = weaponList.reduce((obj, elm) => {
    obj[elm] = obj[elm] === undefined ? 1 : obj[elm] + 1;
    return obj;
  }, {});

  const likelyWeaponList = Object.keys(countObj);

  return Object.keys(
    likelyWeaponList.reduce(
      (obj, elm, ind, arr) => {
        const current = Object.keys(obj)[0];
        if (countObj[elm] > obj[current]) {
          obj[elm] = countObj[elm];
          delete obj[current];
          return obj;
        }
        return obj;
      },
      { result: 0 }
    )
  )[0];
}

const victim = {
  sex: "Male",
  age: "65",
  race: "White"
};

async function getSuspect(victim) {
  const weapon = victim.weapon
    ? victim.weapon
    : await getProbableWeapon(victim);

  victim.weapon = weapon;
  const data = await getDataByVictim(victim);
  const suspectAge = calculateSuspectAge(data);
  const suspectSex = calculateSuspectSex(data);
  const suspectRelation = calculateRelationship(data);
  const suspect = {
    sex: suspectSex,
    age: suspectAge
  };

  const details = { victim, suspect, relationship: suspectRelation, weapon };

  console.log(details);
}

// getSuspect(victim);
//take age, sex, race, manner of death and get most likely suspect

const crime = {
  handgun: 3
};

erin.eyes = "blue";
