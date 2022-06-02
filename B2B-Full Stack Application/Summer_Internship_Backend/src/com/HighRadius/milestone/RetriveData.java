package com.HighRadius.milestone;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;
// API for searching and retriving data.
@WebServlet("/retrive")
public class RetriveData extends HttpServlet {
	    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
		static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
		static final String DB_URL = "jdbc:mysql://localhost/h2h_internship";
		static final String USER = "root";
		static final String PASS = "root";
	
	public void doGet(HttpServletRequest  req, HttpServletResponse res) {
		
		System.out.println("Inside serverlet");
		
		String invoice_id =req.getParameter("invoice_id");
		 String query="SELECT name_customer, cust_number , invoice_id , total_open_amount , due_in_date FROM invoice_details WHERE invoice_id = ";
 		 query+=invoice_id;
        
        //JDBC CONNECTION
     // JDBC driver name and database URL
     		
     		 Connection conn = null;
     		 Statement stmt = null;	
     		 ResultSet rs=null;
     		 res.setContentType("application/json");
     		 Gson g=new Gson();
     		//STEP 2: Register JDBC driver
     		try { 
				Class.forName("com.mysql.jdbc.Driver");
				//STEP 3: Open a connection
				conn = DriverManager.getConnection(DB_URL,USER,PASS);
				//STEP 4: Execute a query
				 stmt = conn.createStatement();
				 rs = stmt.executeQuery(query);
				 
				 // result of query in rs now to print it.
				 List<Invoice_POJO> list=new ArrayList<>();
				 while(rs.next()) {
					 
					 Invoice_POJO obj=new Invoice_POJO();
					 obj.setName_customer(rs.getString("name_customer"));
					 obj.setInvoice_id(rs.getString("invoice_id"));
					 list.add(obj);
					 
				 }
				 
				 //list prepared.
				 String result=g.toJson(list);
				 /*
				 for(Invoice_POJO row : list) {
					 res.getWriter().println(row.getInvoice_id()+" : "+row.getName_customer());
				 }
				  */
				 res.getWriter().println(result);
				 //res.getWriter().flush();
				 
				 
				 //finished. 
				    rs.close();
					stmt.close();
					conn.close();
     		}catch(SQLException se){
    			//Handle errors for JDBC
    			se.printStackTrace();
    			}catch(Exception e){
    			//Handle errors for Class.forName
    			e.printStackTrace();
    			}finally{
    			//finally block used to close resources
    			try{
    			if(stmt!=null)
    			stmt.close();
    			}catch(SQLException se2){
    			}// nothing we can do
    			try{
    			if(conn!=null)
    			conn.close();
    			}catch(SQLException se){
    			se.printStackTrace();
    			}
    			}
             		
	
	
	
 
        }
}
