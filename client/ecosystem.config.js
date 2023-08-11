module.exports = {
  apps: [
    {
      name: "personal-portfolio-client",
      script: "cd /root/personal-portfolio/client/build && serve",
      args: "-l 3000",
      interpreter: "none" // This tells PM2 not to use any specific interpreter like node or bash
    }
  ]
};
