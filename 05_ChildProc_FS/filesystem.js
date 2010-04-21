var sys = require("sys"),
   path = require("path"),
     fs = require("fs");

var file = path.join(__dirname, "test_file.txt");

fs.open(file, "w", 0644, function(err, fd) {
  if (err) throw err;
  sys.puts("File test_file.txt opened");
  fs.write(fd, "Hello World", 0, "utf8", function(err, written) {  
    sys.puts("Data written");
    if (err) throw err;
    fs.closeSync(fd);

    fs.watchFile(file, function(curr, prev) {
      sys.puts("\n\ttest_file.txt has been edited");
      sys.puts("\tThe current mtime is: " + curr.mtime);
      sys.puts("\tThe previous mtime was: " + prev.mtime + "\n");
    });

    chmod_file();
  });
});

function chmod_file() {
  fs.chmod(file, 0777, function(err) {
    if (err) throw err;
    sys.puts("\nchmod value of test_file.txt set to 777");

    fs.chmodSync(file, 0644);
    sys.puts("chmod value of test_file.txt set to 644");

    show_dir();
  });
}
 
function show_dir() {
  sys.puts("\nContent of " + __dirname + ":");
  fs.readdir(__dirname, function(err, files) {
    if (err) throw err;
    sys.puts(JSON.stringify(files));
    show_file_content();
  });
}

function show_file_content() {
  fs.readFile(file, function(err, content) {
    if (err) throw err;
    sys.puts("\nContent of test_file.txt:");
    sys.puts(content);
    delete_file();
  });
}

function delete_file() {
  fs.unwatchFile(file);
  sys.puts("\nStopping watchFile of test_file.txt");

  fs.unlink(file, function(err) {
    if (err) throw err;
    sys.puts("\ntest_file.txt has been deleted.");
  });  
}
