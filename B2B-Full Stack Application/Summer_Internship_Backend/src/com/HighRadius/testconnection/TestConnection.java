package com.HighRadius.testconnection;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class TestConnection {
   
		// JDBC driver name and database URL
		static final String JDBC_DRIVER = "com.mysql.jdbc.Driver";
		static final String DB_URL = "jdbc:mysql://localhost/sakila";
		// Database credentials
		static final String USER = "root";
		static final String PASS = "root";
		public static void main(String[]args) throws SQLException {
		 Connection conn = null;
		 Statement stmt = null;	
		 ResultSet rs=null;
		// User Input
		  List<Avengers> list= new ArrayList<Avengers>();
		  Scanner sc=new Scanner(System.in);
		 
		  while(true) {
			  System.out.println("Enter your choice..");
			  System.out.println("Press 1 for 'Fetch and display whole table data' ");
			  System.out.println("Press 2 for 'Fetch Alias, Quote Column Data using Serial.'");
			  int choice =sc.nextInt();
			  String query="";
			  switch(choice) {
			  case 1: query="SELECT * FROM avengers"; break;
			  case 2: 
				  System.out.println("Enter the serial..");
				  int serial=sc.nextInt();
				  query="SELECT alias, quote, serial  FROM Avengers WHERE serial = " + String.valueOf(serial);
				  break;
			  case 3: return;
			  default: System.out.println("Wrong choice!! Enter 1 or 2.");break;
			  }
				
			
				  try{
						//STEP 2: Register JDBC driver
						Class.forName("com.mysql.jdbc.Driver");
						//STEP 3: Open a connection
						conn = DriverManager.getConnection(DB_URL,USER,PASS);
						//STEP 4: Execute a query
						stmt = conn.createStatement();
						 rs = stmt.executeQuery(query);
				     while(rs.next()){
						//Retrieve by column name
					    Avengers avg=new Avengers();
					    if(choice==2) {
					    	avg.setSerial(rs.getInt("serial"));
					    	avg.setAlias(rs.getString("alias"));
							avg.setQuote(rs.getString("quote"));
					    }
					    else {
						avg.setSerial(rs.getInt("serial"));
						avg.setFirst_name(rs.getString("first_name"));
						avg.setLast_name(rs.getString("last_name"));
						avg.setAlias(rs.getString("alias"));
						avg.setQuote(rs.getString("quote"));
					    }
						// Putting object to ArrayList
						list.add(avg);
				  }
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
			//System.out.println("Goodbye!");
					//Display values
					if(choice==1) {
			       for(Avengers obj : list) {
					System.out.print("Serial: " + obj.getSerial());
					System.out.print(", First: " + obj.getFirst_name());
					System.out.print(", Last: " + obj.getLast_name());
					System.out.print(", Alias: " + obj.getAlias());
					System.out.print(", Quote: " + obj.getQuote());
					System.out.println();
			       }
			      
			       }
					else if(choice==2) {
					for(Avengers obj: list) {
						System.out.println("Alias: "+obj.getAlias());
						System.out.println("Quote: "+obj.getQuote());
					}
					}	  
			  list.clear();
		  }// Infinite loop  
		}
}


