import { ref } from 'vue';

export default function useLocationMap() {
    
    const zoom = ref(11);

    const center=ref([-34.61315, -58.37723]);

    function pin(e){
        const marker = e.target.getLatLng();
        center.value = [marker.lat, marker.lng];
    }


    return {
        zoom,
        center,
        pin
    }
}