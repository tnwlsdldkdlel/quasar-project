import CryptoJS from "crypto-js";
import axios from "axios";
import { useQuasar } from "quasar";

export default {
  isEmpty(value) {
    if (value === "" || value === null || value === undefined || (typeof value === "string" && value.trim().length === 0)
      || (typeof value == "object" && Object.keys(value).length === 0)
    ) {
      return true;
    }

    return false;
  },

  setAESEncodnig(value) {
    if (!this.isEmpty(value)) {
      const key = CryptoJS.enc.Utf8.parse("test1324");
      const encrypted = CryptoJS.AES.encrypt(value, key, {
        iv: CryptoJS.enc.Utf8.parse(""),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });

      return encrypted.toString();
    }

    return "";
  },

  CheckJoinVaildation(data) {
    const idReg = /^[a-z0-9_-]{5,20}$/g;
    const passwordReg = /^(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,16}$/g;
    const keys = Object.keys(data);
    const result_config = [];

    for (var index in keys) {
      var result = false;
      var message = "";
      var target = null;
      var key = keys[index];

      switch (key) {
        case "id":
          if (this.isEmpty(data[key])) {
            message = "필수정보입니다.";
            target = "id";
          } else {
            if (idReg.test(data[key])) {
              result = true;
            } else {
              message = "5~20자의 영문 소문자, 숫자와 특수기호(_),(-)만 사용 가능합니다.";
              target = "id";
            }
          }

          break;
        case "password":
          if (this.isEmpty(data[key])) {
            message = "필수정보입니다.";
            target = "password";
          } else {
            if (passwordReg.test(data[key])) {
              result = true;
            } else {
              message = "8~16자의 영문 소문자, 숫자, 특수문자를 사용해 주세요";
              target = "password";
            }
          }

          break;
        case "name":
          if (this.isEmpty(data[key])) {
            message = "필수정보입니다.";
            target = "name";
          } else {
            result = true;
          }

          break;

        case "birth":
          if (this.isEmpty(data[key])) {
            message = "필수정보입니다.";
            target = "birth";
          } else {
            result = true;
          }

          break;

        case "phone":
          if (this.isEmpty(data[key])) {
            message = "필수정보입니다.";
            target = "phone";
          } else {
            result = true;
          }

          break;

        case "cell":
          if (this.isEmpty(data[key])) {
            message = "필수정보입니다.";
            target = "cell";
          } else {
            result = true;
          }

          break;
      }

      if (!result) {
        var config = {
          message: message,
          target: target
        }

        result_config.push(config);
      }

    }

    return result_config;
  },

  CheckLoginVaildation(data) {
    const keys = Object.keys(data);
    const result_config = [];

    for (var index in keys) {
      var result = false;
      var message = "";
      var target = null;
      var key = keys[index];

      switch (key) {
        case "id":
          if (this.isEmpty(data[key])) {
            message = "아이디를 입력해주세요.";
            target = "id";
          } else {
            result = true;
          }

          break;
        case "password":
          if (this.isEmpty(data[key])) {
            message = "비밀번호를 입력해주세요.";
            target = "password";
          } else {
            result = true;
          }

          break;
      }

      if (!result) {
        var config = {
          message: message,
          target: target
        }

        result_config.push(config);
      }

    }

    return result_config;
  },

  async checkUserToken(token) {
    const url = "/v1/user/info/" + token;
    const q = useQuasar();

    await axios
      .get(url)
      .then((res) => {
        if (res.data.result == "expiredToken") {
          user_store.delete();

          q.dialog({
            title: "로그인 만료",
            message: "로그인 만료되어 다시 로그인페이지로 이동합니다.",
          }).onOk(() => {
            location.href = "/user/login";
          });
        }
      })
  },

  setAESDecodnig(value) {
    if (!this.isEmpty(value)) {
      const key = CryptoJS.enc.Utf8.parse("test1324");
      const decrypted = CryptoJS.AES.decrypt(value, key, {
        iv: CryptoJS.enc.Utf8.parse(""),
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      });

      return decrypted.toString(CryptoJS.enc.Utf8);
    } else {
      return "";
    }

  },

  CheckBlogInfoVaildation(data) {
    const keys = Object.keys(data);
    const result_config = [];

    for (var index in keys) {
      var result = false;
      var message = "";
      var target = null;
      var key = keys[index];

      console.log(key);
      switch (key) {
        case "title":
          if (this.isEmpty(data[key])) {
            message = "필수정보입니다.";
            target = "title";
          } else {
            result = true;
          }

          break;
        case "name":
          if (this.isEmpty(data[key])) {
            message = "필수정보입니다.";
            target = "name";
          } else {
            result = true;
          }

          break;
        case "profile":
          if (this.isEmpty(data[key])) {
            message = "필수정보입니다.";
            target = "profile";
          } else {
            result = true;
          }
          break;

        default:
          result = true;
      }

      if (!result) {
        var config = {
          message: message,
          target: target
        }

        result_config.push(config);
      }

    }

    return result_config;
  },

  convertSnakeCaseToCamelCase(value) {
    const words = value.split('_');
    const camelCaseWord = words
      .map((word, index) => {
        if (index === 0) {
          return word;
        }
        const firstLetterCap = word.charAt(0).toUpperCase();
        const remainingLetters = word.slice(1);
        return firstLetterCap + remainingLetters;
      })
      .join('');

    return camelCaseWord;
  }
}
