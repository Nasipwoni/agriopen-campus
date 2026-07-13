import db from './db.js';

// A starter catalogue so the dashboard has something real to show.
// Levels follow the KNQF banding the platform is built around.
const courses = [
  {
    slug: 'climate-smart-agriculture',
    title: 'Climate-Smart Agriculture',
    level: 'KNQF Level 5',
    duration: '8 weeks',
    summary: 'Practical techniques for farming through drought, erratic rain, and shifting seasons.',
    description:
      'Learners work through soil and water conservation, drought-tolerant crop selection, and low-cost adaptation methods they can apply on their own plots. The course blends field-tested Kenyan case studies with the science behind them, and closes with a farm resilience plan each learner builds for their own context.',
  },
  {
    slug: 'agribusiness-fundamentals',
    title: 'Agribusiness Fundamentals',
    level: 'KNQF Level 4',
    duration: '6 weeks',
    summary: 'Turn a farm into a business: costing, record-keeping, markets, and margins.',
    description:
      'From gross-margin analysis to reading a market before you plant, this course covers the money side of farming. Learners leave able to price a crop, keep books a lender will trust, and spot which enterprises actually pay.',
  },
  {
    slug: 'soil-health-management',
    title: 'Soil Health & Fertility Management',
    level: 'KNQF Level 5',
    duration: '7 weeks',
    summary: 'Read your soil, feed it well, and keep it productive season after season.',
    description:
      'Covers soil testing and interpretation, organic matter, composting, and balanced fertiliser use. Emphasis on building long-term fertility rather than chasing a single good harvest.',
  },
  {
    slug: 'poultry-production',
    title: 'Commercial Poultry Production',
    level: 'KNQF Level 4',
    duration: '5 weeks',
    summary: 'Housing, feeding, disease control, and the numbers behind a profitable flock.',
    description:
      'A hands-on guide to layers and broilers: biosecurity, vaccination schedules, feed conversion, and the record-keeping that separates a hobby flock from a business.',
  },
  {
    slug: 'agricultural-extension',
    title: 'Agricultural Extension & Advisory Skills',
    level: 'KNQF Level 6',
    duration: '9 weeks',
    summary: 'For extension officers: reaching farmers and making advice stick.',
    description:
      'Adult learning, demonstration plots, group facilitation, and using digital tools to extend reach. Built for officers and lead farmers who train others.',
  },
  {
    slug: 'post-harvest-handling',
    title: 'Post-Harvest Handling & Value Addition',
    level: 'KNQF Level 5',
    duration: '6 weeks',
    summary: 'Cut losses after the harvest and add value before the sale.',
    description:
      'Drying, storage, grading, and simple processing that raises the price a farmer gets. Includes food-safety basics and the economics of when value addition is worth it.',
  },
];

const insert = db.prepare(
  `INSERT INTO courses (slug, title, level, duration, summary, description)
   VALUES (@slug, @title, @level, @duration, @summary, @description)
   ON CONFLICT(slug) DO UPDATE SET
     title=@title, level=@level, duration=@duration,
     summary=@summary, description=@description`
);

const run = db.transaction((rows) => {
  for (const row of rows) insert.run(row);
});

run(courses);
console.log(`Seeded ${courses.length} courses.`);
