package controllers

import play.api._
import play.api.mvc._
import play.api.libs.json._
import play.api.libs.functional.syntax._
import views.html._



object Application extends Controller {
  
  def index = Action {
    Ok(views.html.index())
  }
  def sayHello(name: String) = Action {
	Ok("Hello " + name)
	//http://localhost:9000/helloBolek
  }
  
  implicit val rds = (
	(__ \ 'a).read[Double] and
	(__ \ 'b).read[Double] and
	(__ \ 'c).read[Double] 
  ) tupled
  
  def compute = Action(parse.json) { request =>
	request.body.validate[(Double, Double, Double)].map {
		case (a,b,c) => {
		val x1 = 2*a +b
		val x2 = c*c
		//Ok(Json.toJson( Map ("x1" -> x1, "x2" -> x2)))
		Ok(Json.obj("x1" -> x1, "x2" -> x2))
		}
	}.recoverTotal{
        e => BadRequest("Detected error:"+ JsError.toFlatJson(e))
      }
    }
	
	
	
	/*
		val a = json.findPath("a").asDouble();
		val b = json.findPath("b").asDouble();
		val c = json.findPath("c").asDouble();
		
		val delta = (b*b)-(4*a*c);
		val PzD = Math.sqrt(delta);
		val x1=-b+PzD/2*a;
		val x2=-b-PzD/2*a;
		//return ok("Delta " + delta+" PzD "+PzD+" x1 "+x1+" x2 "+x2);
		//result.put("delta",delta);
		//result.put("PzD",PzD);
		//result.put("x1",x1);
		//result.put("x2",x2);
			//Ok(result);	
		Ok("Wynik: x1="+x1+"; x2="+x2)
	//val jsonNumber = Json.toJson(4)
	//Ok("Wynik " ) */
  
}