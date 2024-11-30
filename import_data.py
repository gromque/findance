import os
import sqlite3
import pandas as pd
import logging

# Logging setup
logging.basicConfig(level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

# Database file path
db_path = 'C:/Users/haitp/OneDrive/back up/project/findance/database.db'
dataset_folder = 'C:/Users/haitp/OneDrive/back up/FINTECH/cop/dataset'

# Connect to SQLite database
conn = sqlite3.connect(db_path)
cursor = conn.cursor()

def drop_table_if_exists(table_name):
    cursor.execute(f"DROP TABLE IF EXISTS {table_name};")
    logging.info(f"Table '{table_name}' dropped if it existed.")

def create_table_from_csv(file_path, table_name):
    logging.info(f"Processing file: {file_path}")
    try:
        df = pd.read_csv(file_path)
    except Exception as e:
        logging.error(f"Error reading {file_path}: {e}")
        return

    # Drop existing table
    drop_table_if_exists(table_name)

    # Generate CREATE TABLE statement dynamically
    columns = df.columns
    col_types = []
    for col in columns:
        if df[col].dtype == 'int64':
            col_types.append(f'"{col}" INTEGER')
        elif df[col].dtype == 'float64':
            col_types.append(f'"{col}" REAL')
        else:
            col_types.append(f'"{col}" TEXT')

    col_definitions = ", ".join(col_types)
    create_table_query = f'CREATE TABLE "{table_name}" ({col_definitions});'
    cursor.execute(create_table_query)
    logging.info(f"Created table '{table_name}' with columns: {columns}")

    # Insert data into the table
    try:
        df.to_sql(table_name, conn, if_exists='replace', index=False)
        logging.info(f"Imported {len(df)} rows into table '{table_name}'.")
    except Exception as e:
        logging.error(f"Error inserting data into table {table_name}: {e}")

if __name__ == "__main__":
    if not os.path.exists(dataset_folder):
        logging.error(f"Dataset folder not found: {dataset_folder}")
    else:
        for file_name in os.listdir(dataset_folder):
            if file_name.endswith('.csv'):
                file_path = os.path.join(dataset_folder, file_name)
                table_name = os.path.splitext(file_name)[0].replace("-", "").replace(" ", "_")
                try:
                    create_table_from_csv(file_path, table_name)
                except Exception as e:
                    logging.error(f"Error processing file {file_name}: {e}")

        conn.commit()
        conn.close()
        logging.info("All CSV files have been imported successfully.")
