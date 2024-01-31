import { computed, ref } from "vue";
import { collection, doc, deleteDoc } from "firebase/firestore";
import { ref as storageRef, deleteObject } from "firebase/storage";
import { useFirestore, useCollection, useFirebaseStorage } from "vuefire";
import { useRouter } from "vue-router";

export default function usePropiedades() {
  const router = useRouter();

  const alberca = ref(false);

  const storage = useFirebaseStorage();
  const db = useFirestore();

  const propiedadesCollection = useCollection(collection(db, "propiedades"));

  const priceProperty = computed(() => {
    return (price) =>
      Number(price).toLocaleString("es-US", {
        style: "currency",
        currency: "USD",
      });
  });

  async function eliminarPropiedad(id, imgUrl) {
        const docRef = doc(db, "propiedades", id);
        const imageRef = storageRef(storage, imgUrl);
        if(confirm('¿Deseas eliminar esta propiedad?')){
            await Promise.all([
            deleteDoc(docRef),
            deleteObject(imageRef),
        ])
            router.push({ name: "admin-propiedades" });
        }
        return
  }

  const propiedadesFiltradas = computed(() => {
    if (alberca.value) {
      return propiedadesCollection.value.filter(
        (prop) => prop.alberca === alberca.value
      );
    } else {
      return propiedadesCollection.value;
    }
  });

  return {
    propiedadesCollection,
    priceProperty,
    eliminarPropiedad,
    alberca,
    propiedadesFiltradas,
  };
}
