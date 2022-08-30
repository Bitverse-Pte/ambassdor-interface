export default {
  npmClient: 'yarn',
  proxy: {
    "/jeecg-boot" : {
      "target" : "https://teleport-ambassadorboot.qa.davionlabs.com",
      "changeOrigin" : true
    }
  },
  plugins: [
    '@umijs/plugins/dist/model'
  ],
  model: {},
  styles: [ 
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
  'https://fonts.googleapis.com/css2?family=Dela+Gothic+One&family=Poppins:ital,wght@0,400;0,500;0,600;1,300&display=swap" rel="stylesheet']
};
