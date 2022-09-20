import { HemisphereLight, DirectionalLight } from 'three';

function createHemisphereLight() {
    var hemiLight = new HemisphereLight( 0xffffff, 0xffffff, 0.6 );
    hemiLight.color.setHSL( 0.6, 1, 0.6 );
    hemiLight.groundColor.setHSL( 0.095, 1, 0.75 );
    hemiLight.position.set( 0, 0, 500 );
    return hemiLight;
}

function createDirectionalLight() {
    var dirLight = new DirectionalLight(0xffffff, 1);
    dirLight.position.set(8, 10, 11);
    dirLight.position.multiplyScalar(50);
    dirLight.castShadow = true;
    return dirLight;
}

export const directional = createDirectionalLight();
export const hemisphere = createHemisphereLight();
