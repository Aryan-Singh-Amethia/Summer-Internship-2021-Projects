package com.HighRadius.milestone;


import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import com.google.gson.Gson;
/**
 * Servlet implementation class ViewCorresServlet
 */
@WebServlet("/viewdata")
public class ViewData extends HttpServlet {
	private static final long serialVersionUID = 1L;
       
    /**
     * @see HttpServlet#HttpServlet()
     */
    public ViewData() {
        super();
        // TODO Auto-generated constructor stub
    }
    static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
    static final String DB_URL = "jdbc:mysql://localhost/h2h_internship";
    static final String USER = "root";
  	static final String PASS = "root";


	/**
	 * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		//response.getWriter().append("Served at: ").append(request.getContextPath());
				response.setContentType("application/json");
			    response.setCharacterEncoding("UTF-8");
			    PrintWriter out = response.getWriter();
				
				String doc_id= request.getParameter("doc_id");
				List<Invoice_POJO> list_users= new ArrayList<>();
				Connection conn = null;
				Statement statement=null;
				try {

					Class.forName(JDBC_DRIVER);
				    conn=DriverManager.getConnection(DB_URL,USER,PASS);
				    statement = conn.createStatement();
				      String query = "SELECT cust_number FROM invoice_details WHERE doc_id =" + doc_id;
				      System.out.println(query);
				      ResultSet rs = statement.executeQuery(query);
				      String cust_number="";
				      if(rs.next()){
					      cust_number=rs.getString(1);
					   }
				      
				      System.out.println("\n\n*"+cust_number+"*\n\n");
				      
				      query = "SELECT name_customer,due_in_date,invoice_currency,total_open_amount,doc_id,document_create_date FROM invoice_details WHERE cust_number = " + cust_number;
				      rs=statement.executeQuery(query);
				      while(rs.next()){
				    	  Invoice_POJO u=new Invoice_POJO();
				    	  u.setCustomer_number(cust_number);
				    	  u.setName_customer(rs.getString(1));
				          u.setDue_in_date(rs.getString(2));
				    	  u.setInvoice_currency(rs.getString(3));
				    	  u.setTotal_open_amount(rs.getDouble(4));
				    	  u.setDoc_id(String.valueOf(rs.getLong(5)));
			              u.setDocument_create_date(rs.getString(6));
			               
				    	  
				    	  
				    	//set values in arraylist
			              System.out.println(Arrays.toString(list_users.toArray()));
			              list_users.add(u);
				      }
				      Gson gson = new Gson();
					String data = gson.toJson(list_users);
					   out.write(data.toString());
				      
				}catch(Exception e) {
					System.out.print("ERROR!");
					e.printStackTrace();
					
				}

				
			}


	/**
	 * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
	 */
	protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
		// TODO Auto-generated method stub
		doGet(request, response);
	}

}
