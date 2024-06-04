return {
  type: "app",
  routes: {
    home: {
      path: "${config_account}/widget/page.home",
      blockHeight: "final",
      init: {
        name: "Home",
      },
    },
    create: {
      path: "${config_account}/widget/page.create",
      blockHeight: "final",
      init: {
        name: "Create",
      },
    },
    explore: {
      path: "${config_account}/widget/page.explore",
      blockHeight: "final",
      init: {
        name: "Explore",
      },
    },
    profile: {
      path: "${config_account}/widget/page.profile",
      blockHeight: "final",
      init: {
        name: "Profile",
      },
    },
    tools: {
      path: "${config_account}/widget/page.tools",
      blockHeight: "final",
      init: {
        name: "Tools",
      },
    },
    docs: {
      path: "${config_account}/widget/page.docs",
      blockHeight: "final",
      init: {
        name: "Docs",
      },
    },
  },
};
