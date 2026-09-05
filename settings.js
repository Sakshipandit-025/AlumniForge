/* =========================================================
   ALUMNIFORGE SETTINGS.JS
   ========================================================= */


/* =========================================================
   PROFILE DROPDOWN
   ========================================================= */

const profileWrapper =
  document.querySelector(".profile-wrapper");

const profileButton =
  document.getElementById("profileButton");

if (profileWrapper && profileButton) {

  profileButton.addEventListener(
    "click",
    function (event) {

      event.stopPropagation();

      profileWrapper.classList.toggle("open");

      const isOpen =
        profileWrapper.classList.contains("open");

      profileButton.setAttribute(
        "aria-expanded",
        isOpen ? "true" : "false"
      );

    }
  );


  document.addEventListener(
    "click",
    function (event) {

      if (
        !profileWrapper.contains(event.target)
      ) {

        profileWrapper.classList.remove(
          "open"
        );

        profileButton.setAttribute(
          "aria-expanded",
          "false"
        );

      }

    }
  );


  document.addEventListener(
    "keydown",
    function (event) {

      if (event.key === "Escape") {

        profileWrapper.classList.remove(
          "open"
        );

        profileButton.setAttribute(
          "aria-expanded",
          "false"
        );

        profileButton.focus();

      }

    }
  );

}


/* =========================================================
   ELEMENTS
   ========================================================= */

const fullName =
  document.getElementById("fullName");

const email =
  document.getElementById("email");

const timezone =
  document.getElementById("timezone");

const language =
  document.getElementById("language");

const learningLevel =
  document.getElementById("learningLevel");

const studyGoal =
  document.getElementById("studyGoal");

const interest =
  document.getElementById("interest");


/* Security */

const twoFactorToggle =
  document.getElementById("twoFactorToggle");


/* Notifications */

const announcementToggle =
  document.getElementById(
    "announcementToggle"
  );

const forumToggle =
  document.getElementById(
    "forumToggle"
  );

const communityToggle =
  document.getElementById(
    "communityToggle"
  );


/* Save */

const saveStatus =
  document.getElementById("saveStatus");


/* Profile photo */

const photoInput =
  document.getElementById(
    "profilePhotoInput"
  );

const removePhotoBtn =
  document.getElementById(
    "removePhotoBtn"
  );

const photoPreview =
  document.getElementById(
    "photoPreview"
  );

const profileImage =
  document.getElementById(
    "profileImage"
  );

const photoInitial =
  document.getElementById(
    "photoInitial"
  );


/* Navbar */

const navProfileName =
  document.getElementById(
    "navProfileName"
  );

const navbarAvatar =
  document.getElementById(
    "navbarAvatar"
  );


/* =========================================================
   DEFAULT SETTINGS
   ========================================================= */

const defaultSettings = {

  fullName: "",

  email: "",

  timezone: "Asia/Kolkata",

  language:
    localStorage.getItem(
      "alumniForgeLanguage"
    ) || "en",

  learningLevel: "beginner",

  studyGoal: "60",

  interest: "Python",

  twoFactor: false,


  /* Notifications */

  notifications: {

    announcements: true,

    forum: true,

    community: true

  },


  /* Theme */

  theme:
    localStorage.getItem(
      "alumniForgeTheme"
    ) || "light"

};


/* =========================================================
   SAFE LOCAL STORAGE PARSER
   ========================================================= */

function getSavedSettings() {

  try {

    return JSON.parse(
      localStorage.getItem(
        "alumniForgeSettings"
      ) || "{}"
    );

  } catch (error) {

    console.warn(
      "Unable to read AlumniForge settings.",
      error
    );

    return {};

  }

}


/* =========================================================
   TOGGLE HELPER
   ========================================================= */

function setToggle(
  element,
  state
) {

  if (!element) {
    return;
  }

  element.classList.toggle(
    "active",
    Boolean(state)
  );

  element.setAttribute(
    "aria-pressed",
    state ? "true" : "false"
  );

}


/* =========================================================
   GET TOGGLE STATE
   ========================================================= */

function getToggleState(
  element
) {

  if (!element) {
    return false;
  }

  return element.classList.contains(
    "active"
  );

}


/* =========================================================
   LOAD SETTINGS
   ========================================================= */

function loadSettings() {

  const saved =
    getSavedSettings();


  const savedNotifications =
    saved.notifications || {};


  const settings = {

    ...defaultSettings,

    ...saved,

    notifications: {

      ...defaultSettings.notifications,

      ...savedNotifications

    }

  };


  /* -----------------------------------------
     BASIC PROFILE
  ----------------------------------------- */

  if (fullName) {

    fullName.value =
      settings.fullName || "";

  }


  if (email) {

    email.value =
      settings.email || "";

  }


  if (timezone) {

    timezone.value =
      settings.timezone ||
      "Asia/Kolkata";

  }


  if (language) {

    language.value =
      settings.language ||
      localStorage.getItem(
        "alumniForgeLanguage"
      ) ||
      "en";

  }


  if (learningLevel) {

    learningLevel.value =
      settings.learningLevel ||
      "beginner";

  }


  if (studyGoal) {

    studyGoal.value =
      settings.studyGoal ||
      "60";

  }


  if (interest) {

    interest.value =
      settings.interest ||
      "Python";

  }


  /* -----------------------------------------
     TWO FACTOR
  ----------------------------------------- */

  setToggle(
    twoFactorToggle,
    settings.twoFactor === true
  );


  /* -----------------------------------------
     NOTIFICATIONS
  ----------------------------------------- */

  setToggle(
    announcementToggle,
    settings.notifications.announcements !== false
  );


  setToggle(
    forumToggle,
    settings.notifications.forum !== false
  );


  setToggle(
    communityToggle,
    settings.notifications.community !== false
  );


  /* -----------------------------------------
     THEME
  ----------------------------------------- */

  applyTheme(
    settings.theme ||
    localStorage.getItem(
      "alumniForgeTheme"
    ) ||
    "light",
    false
  );


  /* -----------------------------------------
     PROFILE NAME
  ----------------------------------------- */

  updateProfileName(
    settings.fullName
  );

}


/* =========================================================
   SAVE SETTINGS
   ========================================================= */

function saveSettings() {

  const existing =
    getSavedSettings();


  const selectedTheme =
    localStorage.getItem(
      "alumniForgeTheme"
    ) || "light";


  const settings = {

    ...existing,


    /* -----------------------------------------
       PROFILE
    ----------------------------------------- */

    fullName:
      fullName
        ? fullName.value.trim()
        : "",

    email:
      email
        ? email.value.trim()
        : "",

    timezone:
      timezone
        ? timezone.value
        : "Asia/Kolkata",

    language:
      language
        ? language.value
        : "en",

    learningLevel:
      learningLevel
        ? learningLevel.value
        : "beginner",

    studyGoal:
      studyGoal
        ? studyGoal.value
        : "60",

    interest:
      interest
        ? interest.value
        : "Python",


    /* -----------------------------------------
       SECURITY
    ----------------------------------------- */

    twoFactor:
      getToggleState(
        twoFactorToggle
      ),


    /* -----------------------------------------
       NOTIFICATIONS
    ----------------------------------------- */

    notifications: {

      announcements:
        getToggleState(
          announcementToggle
        ),

      forum:
        getToggleState(
          forumToggle
        ),

      community:
        getToggleState(
          communityToggle
        )

    },


    /* -----------------------------------------
       THEME
    ----------------------------------------- */

    theme:
      selectedTheme

  };


  /* -----------------------------------------
     SAVE SETTINGS OBJECT
  ----------------------------------------- */

  localStorage.setItem(
    "alumniForgeSettings",
    JSON.stringify(settings)
  );


  /* -----------------------------------------
     SAVE LANGUAGE
  ----------------------------------------- */

  localStorage.setItem(
    "alumniForgeLanguage",
    settings.language
  );


  /* -----------------------------------------
     SAVE THEME
  ----------------------------------------- */

  localStorage.setItem(
    "alumniForgeTheme",
    selectedTheme
  );


  /* -----------------------------------------
     UPDATE PROFILE
  ----------------------------------------- */

  updateProfileName(
    settings.fullName
  );


  /* -----------------------------------------
     SAVE STATUS
  ----------------------------------------- */

  if (saveStatus) {

    saveStatus.textContent =
      "All changes have been saved.";

    saveStatus.classList.add(
      "saved"
    );

  }


  showToast(
    "Settings saved successfully."
  );


  setTimeout(
    function () {

      if (!saveStatus) {
        return;
      }

      saveStatus.textContent =
        "Changes are saved locally on this device.";

      saveStatus.classList.remove(
        "saved"
      );

    },
    3000
  );

}


/* =========================================================
   SAVE BUTTON
   ========================================================= */

const saveBtn =
  document.getElementById(
    "saveBtn"
  );

if (saveBtn) {

  saveBtn.addEventListener(
    "click",
    saveSettings
  );

}


/* =========================================================
   RESET SETTINGS
   ========================================================= */

const resetBtn =
  document.getElementById(
    "resetBtn"
  );

if (resetBtn) {

  resetBtn.addEventListener(
    "click",
    function () {

      const confirmReset =
        confirm(
          "Reset your AlumniForge settings?"
        );


      if (!confirmReset) {
        return;
      }


      /* Remove settings */

      localStorage.removeItem(
        "alumniForgeSettings"
      );


      /* Reset theme */

      localStorage.setItem(
        "alumniForgeTheme",
        "light"
      );


      /* Reset language */

      localStorage.setItem(
        "alumniForgeLanguage",
        "en"
      );


      /* Reset UI */

      document.documentElement.classList.remove(
        "dark"
      );


      loadSettings();


      showToast(
        "Settings have been reset."
      );

    }
  );

}


/* =========================================================
   TWO FACTOR TOGGLE
   ========================================================= */

if (twoFactorToggle) {

  twoFactorToggle.addEventListener(
    "click",
    function () {

      const newState =
        !this.classList.contains(
          "active"
        );


      setToggle(
        this,
        newState
      );

    }
  );

}


/* =========================================================
   NOTIFICATION TOGGLE FUNCTION
   ========================================================= */

function setupNotificationToggle(
  element
) {

  if (!element) {
    return;
  }


  element.addEventListener(
    "click",
    function () {

      const newState =
        !this.classList.contains(
          "active"
        );


      setToggle(
        this,
        newState
      );


      /*
        Notification preferences are
        saved immediately so that
        other AlumniForge pages can
        access them.
      */

      saveNotificationPreferences();


    }
  );

}


/* =========================================================
   SAVE NOTIFICATION PREFERENCES
   ========================================================= */

function saveNotificationPreferences() {

  const settings =
    getSavedSettings();


  settings.notifications = {

    announcements:
      getToggleState(
        announcementToggle
      ),

    forum:
      getToggleState(
        forumToggle
      ),

    community:
      getToggleState(
        communityToggle
      )

  };


  localStorage.setItem(
    "alumniForgeSettings",
    JSON.stringify(settings)
  );


  /*
    Separate keys make it easier
    for notification/forum pages
    to read preferences directly.
  */

  localStorage.setItem(
    "alumniForgeNotifications",
    JSON.stringify(
      settings.notifications
    )
  );


  showToast(
    "Notification preferences updated."
  );

}


/* =========================================================
   INITIALIZE NOTIFICATION TOGGLES
   ========================================================= */

setupNotificationToggle(
  announcementToggle
);

setupNotificationToggle(
  forumToggle
);

setupNotificationToggle(
  communityToggle
);


/* =========================================================
   THEME
   ========================================================= */

const themeOptions =
  document.querySelectorAll(
    ".theme-option"
  );


themeOptions.forEach(
  function (option) {

    option.addEventListener(
      "click",
      function () {

        const theme =
          this.dataset.theme;


        if (!theme) {
          return;
        }


        applyTheme(
          theme,
          true
        );

      }
    );

  }
);


/* =========================================================
   APPLY THEME
   ========================================================= */

function applyTheme(
  theme,
  save
) {

  document.documentElement.classList.remove(
    "dark"
  );


  /* -----------------------------------------
     DARK
  ----------------------------------------- */

  if (theme === "dark") {

    document.documentElement.classList.add(
      "dark"
    );

  }


  /* -----------------------------------------
     SYSTEM
  ----------------------------------------- */

  if (theme === "system") {

    const systemDark =
      window.matchMedia &&
      window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;


    if (systemDark) {

      document.documentElement.classList.add(
        "dark"
      );

    }

  }


  /* -----------------------------------------
     UPDATE THEME CARDS
  ----------------------------------------- */

  themeOptions.forEach(
    function (option) {

      option.classList.toggle(
        "active",
        option.dataset.theme === theme
      );

    }
  );


  /* -----------------------------------------
     SAVE THEME
  ----------------------------------------- */

  if (save) {

    localStorage.setItem(
      "alumniForgeTheme",
      theme
    );


    const settings =
      getSavedSettings();


    settings.theme =
      theme;


    localStorage.setItem(
      "alumniForgeSettings",
      JSON.stringify(settings)
    );


    if (theme === "dark") {

      showToast(
        "Dark mode enabled across AlumniForge."
      );

    }

    else if (theme === "system") {

      showToast(
        "System theme enabled."
      );

    }

    else {

      showToast(
        "Light mode enabled."
      );

    }

  }

}


/* =========================================================
   SYSTEM THEME LISTENER
   ========================================================= */

if (window.matchMedia) {

  const systemTheme =
    window.matchMedia(
      "(prefers-color-scheme: dark)"
    );


  const handleSystemThemeChange =
    function () {

      const currentTheme =
        localStorage.getItem(
          "alumniForgeTheme"
        );


      if (
        currentTheme === "system"
      ) {

        applyTheme(
          "system",
          false
        );

      }

    };


  if (
    systemTheme.addEventListener
  ) {

    systemTheme.addEventListener(
      "change",
      handleSystemThemeChange
    );

  }

  else if (
    systemTheme.addListener
  ) {

    systemTheme.addListener(
      handleSystemThemeChange
    );

  }

}


/* =========================================================
   LANGUAGE
   ========================================================= */

if (language) {

  language.addEventListener(
    "change",
    function () {

      const selectedLanguage =
        this.value;


      /* -----------------------------------------
         SAVE LANGUAGE
      ----------------------------------------- */

      localStorage.setItem(
        "alumniForgeLanguage",
        selectedLanguage
      );


      /* -----------------------------------------
         UPDATE SETTINGS OBJECT
      ----------------------------------------- */

      const settings =
        getSavedSettings();


      settings.language =
        selectedLanguage;


      localStorage.setItem(
        "alumniForgeSettings",
        JSON.stringify(settings)
      );


      /* -----------------------------------------
         MESSAGE
      ----------------------------------------- */

      if (
        selectedLanguage === "hi"
      ) {

        showToast(
          "Hindi preference saved. Hindi translation will apply across supported AlumniForge pages."
        );

      }

      else {

        showToast(
          "English preference saved."
        );

      }

    }
  );

}


/* =========================================================
   PROFILE NAME
   ========================================================= */

function updateProfileName(
  name
) {

  const safeName =
    typeof name === "string"
      ? name.trim()
      : "";


  if (!safeName) {

    if (navProfileName) {

      navProfileName.textContent =
        "Student Profile";

    }


    if (photoInitial) {

      photoInitial.textContent =
        "S";

    }


    return;

  }


  if (navProfileName) {

    navProfileName.textContent =
      safeName;

  }


  if (photoInitial) {

    photoInitial.textContent =
      safeName
        .charAt(0)
        .toUpperCase();

  }

}


/* =========================================================
   PROFILE PHOTO
   ========================================================= */

if (photoInput) {

  photoInput.addEventListener(
    "change",
    function () {

      const file =
        this.files &&
        this.files[0];


      if (!file) {
        return;
      }


      /* -----------------------------------------
         ALLOWED FILE TYPES
      ----------------------------------------- */

      const allowedTypes = [

        "image/jpeg",

        "image/png",

        "image/gif",

        "image/webp"

      ];


      if (
        !allowedTypes.includes(
          file.type
        )
      ) {

        showToast(
          "Please upload a JPG, PNG, GIF or WebP image."
        );


        this.value = "";


        return;

      }


      /* -----------------------------------------
         FILE SIZE
      ----------------------------------------- */

      if (
        file.size >
        1024 * 1024
      ) {

        showToast(
          "Profile photo must be smaller than 1MB."
        );


        this.value = "";


        return;

      }


      /* -----------------------------------------
         READ FILE
      ----------------------------------------- */

      const reader =
        new FileReader();


      reader.onload =
        function (event) {

          const photo =
            event.target.result;


          /* Preview */

          if (profileImage) {

            profileImage.src =
              photo;

          }


          if (photoPreview) {

            photoPreview.classList.add(
              "has-image"
            );

          }


          /* Save */

          localStorage.setItem(
            "alumniForgeProfilePhoto",
            photo
          );


          /* Navbar */

          showNavbarPhoto(
            photo
          );


          /* Show remove button */

          if (removePhotoBtn) {

            removePhotoBtn.style.display =
              "inline-flex";

          }


          showToast(
            "Profile photo updated."
          );

        };


      reader.onerror =
        function () {

          showToast(
            "Unable to read the selected image."
          );

        };


      reader.readAsDataURL(
        file
      );

    }
  );

}


/* =========================================================
   REMOVE PROFILE PHOTO
   ========================================================= */

/*
   IMPORTANT:
   This function is OUTSIDE the FileReader
   callback so the Remove Photo button
   works independently.
*/

function removeProfilePhoto() {

  localStorage.removeItem(
    "alumniForgeProfilePhoto"
  );


  /* -----------------------------------------
     Remove preview
  ----------------------------------------- */

  if (profileImage) {

    profileImage.removeAttribute(
      "src"
    );

  }


  if (photoPreview) {

    photoPreview.classList.remove(
      "has-image"
    );

  }


  /* -----------------------------------------
     Reset navbar avatar
  ----------------------------------------- */

  if (navbarAvatar) {

    navbarAvatar.className =
      "user-icon";

    navbarAvatar.innerHTML =
      "";

  }


  /* -----------------------------------------
     Reset input
  ----------------------------------------- */

  if (photoInput) {

    photoInput.value =
      "";

  }


  /* -----------------------------------------
     Hide remove button
  ----------------------------------------- */

  if (removePhotoBtn) {

    removePhotoBtn.style.display =
      "none";

  }


  showToast(
    "Profile photo removed."
  );

}


/* =========================================================
   REMOVE PHOTO BUTTON EVENT
   ========================================================= */

if (removePhotoBtn) {

  removePhotoBtn.addEventListener(
    "click",
    removeProfilePhoto
  );

}


/* =========================================================
   SHOW NAVBAR PHOTO
   ========================================================= */

function showNavbarPhoto(
  photo
) {

  if (!navbarAvatar) {
    return;
  }


  navbarAvatar.className =
    "user-icon has-photo";


  navbarAvatar.innerHTML =
    "";


  const img =
    document.createElement(
      "img"
    );


  img.src =
    photo;


  img.alt =
    "Profile";


  navbarAvatar.appendChild(
    img
  );

}


/* =========================================================
   LOAD PROFILE PHOTO
   ========================================================= */

function loadProfilePhoto() {

  const savedPhoto =
    localStorage.getItem(
      "alumniForgeProfilePhoto"
    );


  /* -----------------------------------------
     No photo
  ----------------------------------------- */

  if (!savedPhoto) {

    if (profileImage) {

      profileImage.removeAttribute(
        "src"
      );

    }


    if (photoPreview) {

      photoPreview.classList.remove(
        "has-image"
      );

    }


    if (navbarAvatar) {

      navbarAvatar.className =
        "user-icon";

      navbarAvatar.innerHTML =
        "";

    }


    if (removePhotoBtn) {

      removePhotoBtn.style.display =
        "none";

    }


    return;

  }


  /* -----------------------------------------
     Load photo
  ----------------------------------------- */

  if (profileImage) {

    profileImage.src =
      savedPhoto;

  }


  if (photoPreview) {

    photoPreview.classList.add(
      "has-image"
    );

  }


  showNavbarPhoto(
    savedPhoto
  );


  /* Show remove button */

  if (removePhotoBtn) {

    removePhotoBtn.style.display =
      "inline-flex";

  }

}


/* =========================================================
   STORAGE SYNC
   ========================================================= */

window.addEventListener(
  "storage",
  function (event) {


    /* -----------------------------------------
       THEME
    ----------------------------------------- */

    if (
      event.key ===
      "alumniForgeTheme"
    ) {

      applyTheme(
        event.newValue ||
        "light",
        false
      );

    }


    /* -----------------------------------------
       LANGUAGE
    ----------------------------------------- */

    if (
      event.key ===
      "alumniForgeLanguage"
    ) {

      if (language) {

        language.value =
          event.newValue ||
          "en";

      }

    }


    /* -----------------------------------------
       PROFILE PHOTO
    ----------------------------------------- */

    if (
      event.key ===
      "alumniForgeProfilePhoto"
    ) {


      /* Photo added */

      if (event.newValue) {

        if (profileImage) {

          profileImage.src =
            event.newValue;

        }


        if (photoPreview) {

          photoPreview.classList.add(
            "has-image"
          );

        }


        showNavbarPhoto(
          event.newValue
        );


        if (removePhotoBtn) {

          removePhotoBtn.style.display =
            "inline-flex";

        }

      }


      /* Photo removed */

      else {

        if (profileImage) {

          profileImage.removeAttribute(
            "src"
          );

        }


        if (photoPreview) {

          photoPreview.classList.remove(
            "has-image"
          );

        }


        if (navbarAvatar) {

          navbarAvatar.className =
            "user-icon";

          navbarAvatar.innerHTML =
            "";

        }


        if (removePhotoBtn) {

          removePhotoBtn.style.display =
            "none";

        }

      }

    }


    /* -----------------------------------------
       SETTINGS OBJECT
    ----------------------------------------- */

    if (
      event.key ===
      "alumniForgeSettings"
    ) {

      loadSettings();

    }


    /* -----------------------------------------
       NOTIFICATIONS
    ----------------------------------------- */

    if (
      event.key ===
      "alumniForgeNotifications"
    ) {

      try {

        const notifications =
          JSON.parse(
            event.newValue || "{}"
          );


        setToggle(
          announcementToggle,
          notifications.announcements !== false
        );


        setToggle(
          forumToggle,
          notifications.forum !== false
        );


        setToggle(
          communityToggle,
          notifications.community !== false
        );

      }

      catch (error) {

        console.warn(
          "Unable to sync notification preferences.",
          error
        );

      }

    }

  }
);


/* =========================================================
   TOAST
   ========================================================= */

let toastTimer;


function showToast(
  message
) {

  const toast =
    document.getElementById(
      "toast"
    );


  if (!toast) {
    return;
  }


  toast.textContent =
    message;


  toast.classList.add(
    "show"
  );


  clearTimeout(
    toastTimer
  );


  toastTimer =
    setTimeout(
      function () {

        toast.classList.remove(
          "show"
        );

      },
      3000
    );

}


/* =========================================================
   LOGOUT
   ========================================================= */

function logoutUser() {

  const shouldLogout =
    confirm(
      "Are you sure you want to logout?"
    );


  if (!shouldLogout) {
    return;
  }


  window.location.href =
    "index.html";

}


/* =========================================================
   DELETE ACCOUNT
   ========================================================= */

function deleteAccount() {

  const confirmation =
    prompt(
      "Type DELETE to permanently delete your local AlumniForge account data."
    );


  if (
    confirmation !==
    "DELETE"
  ) {

    showToast(
      "Account deletion cancelled."
    );

    return;

  }


  /* -----------------------------------------
     Remove all AlumniForge local data
  ----------------------------------------- */

  localStorage.removeItem(
    "alumniForgeSettings"
  );


  localStorage.removeItem(
    "alumniForgeProfilePhoto"
  );


  localStorage.removeItem(
    "alumniForgeTheme"
  );


  localStorage.removeItem(
    "alumniForgeLanguage"
  );


  localStorage.removeItem(
    "alumniForgeNotifications"
  );


  showToast(
    "Local account data deleted."
  );


  setTimeout(
    function () {

      window.location.href =
        "index.html";

    },
    1200
  );

}


/* =========================================================
   INITIALIZE
   ========================================================= */

loadSettings();

loadProfilePhoto();