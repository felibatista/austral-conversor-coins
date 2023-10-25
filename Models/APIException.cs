using System.Collections;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;


namespace conversor_coin.Models;

public class APIException : ControllerBase
{
    public enum Type
    {
        NOT_FOUND,
        BAD_REQUEST,
        UNAUTHORIZED,
        FORBIDDEN,
        INTERNAL_SERVER_ERROR
    }

    public enum Code
    {
        CV_01,
        CV_02,
        CV_03,
        CV_04,
        
        US_01,
        US_02,
        US_03,
        US_04,
        
        DB_01,
        DB_02,
        
        FG_01,
        FG_02,
        
        SB_01,
        SB_02
    }
    public static Exception CreateException(Code code, String message, Type type)
    {
        Exception e = new Exception();
        e.Data.Add("code", code.ToString());
        e.Data.Add("error", message);
        e.Data.Add("type", type.ToString());
        return e;
    }

    public ActionResult getResultFromError(Type type, IDictionary data)
    {
        switch (type)
        {
            case Type.NOT_FOUND:
                return NotFound(data);
            case Type.BAD_REQUEST:
                return BadRequest(data);
            case Type.UNAUTHORIZED:
                return Unauthorized(data);
            case Type.FORBIDDEN:
                return BadRequest(data);
            case Type.INTERNAL_SERVER_ERROR:
                return BadRequest(data);
            default:
                return BadRequest(data);
        }   
    }
}