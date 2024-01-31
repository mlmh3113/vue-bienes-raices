import { defineStore } from "pinia";
import { useFirebaseAuth } from "vuefire";
import { signInWithEmailAndPassword , onAuthStateChanged , signOut } from "firebase/auth";
import { ref , computed , onMounted } from "vue";
import { useRouter } from "vue-router";

export const useAuthStore = defineStore("auth", () => {
    const auth = useFirebaseAuth();
    const errorMsg = ref()
    const authUser = ref({})

    const router = useRouter();

    const errorCodes = {
        "auth/invalid-email": "Email no válido",
        "auth/user-disabled": "Cuenta deshabilitada",
        "auth/user-not-found": "Usuario no encontrado",
        "auth/wrong-password": "Contraseña incorrecta",
        "auth/invalid-credential": "Mail o contraseña inválidas",
    }

  const login = ({email , password}) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((useCredential) => {
        authUser.value = useCredential.user;
        router.push({name: 'admin-propiedades'})
      })
      .catch((error) => {
        errorMsg.value = errorCodes[error.code];    
      });
  };

  onMounted(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        authUser.value = user;
      }
    });
  })

  const hasError = computed(() => errorMsg.value);

  const isAuth = computed(() => authUser.value);

  const logout = () => {
    signOut(auth).then(() => {
      authUser.value = null
      router.push({name: 'login'})
    }).catch((error) => {
        errorMsg.value = errorCodes[error.code];
    })
  }

  return {
    login,
    hasError,
    isAuth,
    logout
  };
});
