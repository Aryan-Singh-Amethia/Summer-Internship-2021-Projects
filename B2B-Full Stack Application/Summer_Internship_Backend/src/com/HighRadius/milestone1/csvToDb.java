package com.HighRadius.milestone1;
import java.io.*;
import java.sql.*;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
public class csvToDb {
	public static void main(String[] args) throws ParseException {
		String jdbcURL = "jdbc:mysql://localhost/h2h_internship";
        String username = "root";
        String password = "root";
 
        // Specifying the CSV file path.
        String csvFilePath = "C:\\Users\\KIIT\\Downloads\\1805109.csv";
 
        // batch size definition
        int batchSize = 75;
 
        Connection connection = null;
        try {
        	 
            connection = DriverManager.getConnection(jdbcURL, username, password);
            connection.setAutoCommit(false);
            String sql = "INSERT INTO invoice_details (business_code, cust_number, name_customer, doc_id, posting_id, business_year, invoice_currency,document_type, area_business, total_open_amount, cust_payment_terms,invoice_id,isOpen, baseline_create_date, posting_date,document_create_date, due_in_date,clear_date) VALUES ( ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
            PreparedStatement statement = connection.prepareStatement(sql);
 
            BufferedReader lineReader = new BufferedReader(new FileReader(csvFilePath));
            String lineText = null;
             
            //initializing the counter which will take only as much queries as fit in a batch_size
            int count = 0;
 
            lineReader.readLine(); // skip header line
 
            while ((lineText = lineReader.readLine())!= null) {
                String[] data = lineText.split(",");
                
                //Creating Object of the POJO class.
                Invoice_POJO obj=new Invoice_POJO();
                
                
                //Setting the values to POJO object using setter-methods.
                 obj.setBusiness_code(data[0]);           
                 obj.setCustomer_number(data[1]); 
                 obj.setName_customer( data[2]);
                 obj.setClear_date(data[3]);
                 obj.setBusiness_year((data[4]));
                 obj.setDoc_id((data[5]));
                 obj.setPosting_date(data[6]);
                 obj.setDocument_create_date(data[7]);
                 //here we skip data[8] for duplicate columns i.e document_create_date
                 obj.setDue_in_date(data[9]);
                 obj.setInvoice_currency(data[10]);
                 obj.setDocument_type(data[11]);
                 obj.setPosting_id(data[12]);
                 obj.setArea_business(data[13]);
                 obj.setTotal_open_amount(Double.parseDouble(data[14]));
                 obj.setBaseline_create_date(data[15]);
                
                obj.setCustomer_payment_terms(data[16]);
                String invoice_id=(data[17].compareTo("")==0)? "00000":data[17];
                obj.setInvoice_id(invoice_id);
                
                obj.setIs_open(Integer.parseInt(data[18]));
                
                // Preparing the query statement using the parsed values.
           
                statement.setString(1, obj.getBusiness_code());
                statement.setString(2, obj.getCustomer_number());
                statement.setString(3, obj.getName_customer());
                statement.setLong(4, obj.getDoc_id());
                statement.setInt(5, obj.getPosting_id());
                statement.setInt(6, obj.getBusiness_year());
                statement.setString(7, obj.getInvoice_currency());
                statement.setString(8, obj.getDocument_type());
                statement.setString(9, obj.getArea_business());
                statement.setDouble(10,obj.getTotal_open_amount());
                statement.setString(11,obj.getCustomer_payment_terms());
                statement.setLong(12, obj.getInvoice_id());
                statement.setInt(13, obj.getIs_open());
                statement.setTimestamp(14, obj.getBaseline_create_date());
                statement.setTimestamp(15, obj.getPosting_date());
                statement.setTimestamp(16, obj.getDocument_create_date());
                statement.setTimestamp(17, obj.getDue_in_date());
                statement.setTimestamp(18, obj.getClear_date());
                
                //Incrementing counter
                count++;
                
                // Adding to batch
                statement.addBatch();
 
                // Execute batch when the the batch_size is hit.
                if (count % batchSize == 0) {
                    statement.executeBatch();
                }
            }
 
            lineReader.close();
 
            // execute the remaining queries
            statement.executeBatch();
 
            connection.commit();
            connection.close();
 
        } catch (IOException ex) {
            System.err.println(ex);
        } catch (SQLException ex) {
            ex.printStackTrace();
 
            try {
                connection.rollback();
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
     System.out.println("All insert operations completed without any errors.");
	}

}
