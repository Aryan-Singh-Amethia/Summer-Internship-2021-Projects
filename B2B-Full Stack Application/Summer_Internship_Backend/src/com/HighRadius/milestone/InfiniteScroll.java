package com.HighRadius.milestone;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;


import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import com.google.gson.Gson;

@WebServlet("/scroll")
public class InfiniteScroll extends HttpServlet {
	private static final long serialVersionUID = 1L;
	static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
	static final String DB_URL = "jdbc:mysql://localhost/h2h_internship";
	static final String USER = "root";
	static final String PASS = "root";
	Connection conn;
	Statement stmt;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
   public InfiniteScroll() {
        super();
   }

	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException{
		// TODO Auto-generated method stub

		int pageCount=Integer.parseInt(request.getParameter( "pageCount" ));
		
		//int pageCount=0;
		
		int pageLower = pageCount*10+1 ;
		int pageUpper = (pageCount+1)*10;
		String upp =String.valueOf(pageUpper);
		String low =String.valueOf(pageLower);
			
		String sql = "select cust_number,name_customer,doc_id,due_in_date,total_open_amount,invoice_id,notes from invoice_details LIMIT "+low+","+"10";
		
		ArrayList<Invoice_POJO> pj= new ArrayList<>();

		response.setContentType("application/json");
	    response.setCharacterEncoding("UTF-8");
	      System.out.println("*");
		try {
			
		
			Class.forName(JDBC_DRIVER);
		    conn=DriverManager.getConnection(DB_URL,USER,PASS);
		      stmt = conn.createStatement();
		      
		     System.out.println("\n\n\n"+upp+"    "+low+"\n\n\n");
		    System.out.println(sql);
		      ResultSet rs = stmt.executeQuery(sql);
		    while(rs.next()) { 
	  	    	    String s;
	
		    	    Invoice_POJO pojo=new Invoice_POJO();		    	        
	                pojo.setCustomer_number(rs.getString("cust_number"));
	                System.out.println(pojo.getCustomer_number());   
	                 pojo.setName_customer(rs.getString("name_customer"));
	              	pojo.setDoc_id(String.valueOf(rs.getLong(3)));
	                pojo.setDue_in_date(rs.getString("due_in_date"));	            	             
	                pojo.setTotal_open_amount(rs.getDouble(5));     
	                pojo.setInvoice_id(String.valueOf(rs.getLong(6)));    
	                s=rs.getString(7);
	                if(rs.getString(7)==null) {
	                	s="-";
	                }
	                pojo.setNotes(s);
	                 pj.add(pojo);
	                System.out.println("****");
		      }
		      
		 
		      
		}catch(Exception e) {
			System.out.print("ERROR!");
			e.printStackTrace();
			
		}
		
	 	Gson gson = new Gson();
		String data = gson.toJson(pj);
		 PrintWriter out = response.getWriter();
	
	   
	    out.write(data);
	    out.flush();
	    System.out.println("**####################****");

	}
		
	    

	
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub

	}


}