precision mediump float;

#define PI 3.1415926535897932384626433832795

uniform sampler2D uTexture;
varying vec2 vUv;

void main()
{
    vec4 textureColor = texture2D(uTexture, vUv);
    gl_FragColor = textureColor;
}