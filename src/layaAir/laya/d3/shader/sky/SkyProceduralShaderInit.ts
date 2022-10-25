import { Shader3D } from "../../../RenderEngine/RenderShader/Shader3D";
import { ShaderDataType } from "../../../RenderEngine/RenderShader/ShaderData";
import { VertexMesh } from "../../graphics/Vertex/VertexMesh";
import { Color } from "../../math/Color";
import { AttributeMapType, SubShader } from "../SubShader";
import SkyProceduralVS from "./SkyProceduralShader.vs";
import SkyProceduralFS from "./SkyProceduralShader.fs";
import { RenderState } from "../../core/material/RenderState";

export class SkyProceduralShaderInit {
    static init() {
        let attributeMap: AttributeMapType = {
            "a_Position": [VertexMesh.MESH_POSITION0, ShaderDataType.Vector4]
        };

        let uniformMap = {
            "u_SunSize": ShaderDataType.Float,
            "u_SunSizeConvergence": ShaderDataType.Float,
            "u_AtmosphereThickness": ShaderDataType.Float,
            "u_SkyTint": ShaderDataType.Color,
            "u_GroundTint": ShaderDataType.Color,
            "u_Exposure": ShaderDataType.Float,
        };

        let defaultValue = {
            "u_SunSize": 0.04,
            "u_SunSizeConvergence": 5,
            "u_AtmosphereThickness": 1.0,
            "u_SkyTint": new Color(0.5, 0.5, 0.5, 1.0),
            "u_GroundTint": new Color(0.369, 0.349, 0.341, 1.0),
            "u_Exposure": 1.3,
        };
        let shader = Shader3D.add("SkyProcedural");
        
        let subShader = new SubShader(attributeMap, uniformMap, defaultValue);
        shader.addSubShader(subShader);
        let pass = subShader.addShaderPass(SkyProceduralVS, SkyProceduralFS);
        pass.renderState.depthTest = RenderState.DEPTHTEST_LEQUAL;
        pass.statefirst = true;
    }
}