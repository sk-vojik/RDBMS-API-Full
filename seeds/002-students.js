
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('students').del()
    .then(function () {
      // Inserts seed entries
      return knex('students').insert([
        {name: 'Scott', cohort_id: "17"},
        {name: 'Jordan', cohort_id: "12"},
        {name: 'Misha', cohort_id: "4"}
      ]);
    });
};
