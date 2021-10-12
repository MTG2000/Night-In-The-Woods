import os
import re

def rename_files():
    # (1) get file names from a folder
    file_list = os.listdir(r".")

    # print(file_list)
    saved_path = os.getcwd()
    print("Current Working Directory is " + saved_path)
    os.chdir(r".")

    # (2) for each file, rename file name
    for file_name in file_list:
        new_name = re.sub('_0+', '_', file_name)
        print("New Name - " + new_name)
        os.rename(file_name, new_name)
    os.chdir(saved_path)

rename_files()