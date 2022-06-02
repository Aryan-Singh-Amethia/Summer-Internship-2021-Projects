package com.HighRadius.milestone;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
@WebServlet("/delete")
public class DeleteInvoice extends HttpServlet{
	
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
		
		String doc_id =req.getParameter("doc_id");
		 String query="DELETE FROM invoice_details WHERE doc_id = ?";
  		
  		 Connection conn = null;
  		 PreparedStatement statement=null;
  		try { 
				Class.forName("com.mysql.jdbc.Driver");
				//STEP 3: Open a connection
				conn = DriverManager.getConnection(DB_URL,USER,PASS);
				conn.setAutoCommit(false);
				//STEP 4: Execute a query
				statement = conn.prepareStatement(query);
				statement.setLong(1,Long.parseLong(doc_id));
				 statement.addBatch();
					statement.executeBatch();

				 
				 //finished.
				 System.out.println("Row deleted with invoice_id"+doc_id);
				 
				  conn.commit();
					statement.close();
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
 			if(statement!=null)
 			statement.close();
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
