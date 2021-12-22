import { Material } from "laya/d3/core/material/Material";
import { RenderState } from "laya/d3/core/material/RenderState";
import { VertexMesh } from "laya/d3/graphics/Vertex/VertexMesh";
import { Shader3D } from "laya/d3/shader/Shader3D";
import { SubShader } from "laya/d3/shader/SubShader";
import DepthVS from "../DepthNormalShader/DepthTextureTest.vs";
import DepthFS from "../DepthNormalShader/DepthTextureTest.fs";

export class DepthMaterial extends Material{
    /**
     * init
     */
    static init(){
        var shader:Shader3D = Shader3D.add("DepthShader");
        var subShader:SubShader = new SubShader();
        shader.addSubShader(subShader);
        subShader.addShaderPass(DepthVS,DepthFS,"Forward");
    }

    /**
     * constuctor
     */
    constructor(){
        super();
        this.setShaderName("DepthShader");
        this.renderModeSet();
    }

     /**
      * render mode set
      */
     renderModeSet(){
        this.alphaTest = false;//深度测试关闭
        this.renderQueue = Material.RENDERQUEUE_OPAQUE;//渲染顺序放在后面
        this.depthWrite = true;
        this.cull = RenderState.CULL_BACK;
        this.blend = RenderState.BLEND_DISABLE;
        this.depthTest = RenderState.DEPTHTEST_LESS;
    }
}