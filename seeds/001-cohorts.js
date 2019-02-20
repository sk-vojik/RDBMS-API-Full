
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('cohorts').truncate()
    .then(function () {
      // Inserts seed entries
      return knex('cohorts').insert([
        {name: 'web16 the goat'},
        {name: 'web17 2nd best'},
        {name: 'web18 nubs'},
      ]);
    });
};
