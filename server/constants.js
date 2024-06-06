export const LANGUAGE_VERSIONS = {
  javascript: "18.15.0",
  python: "3.10.0",
  java: "15.0.2",
  php: "8.2.3",
  sqlite3: "3.36.0",
};
export const CODE_SNIPPETS = {
  javascript: `
function greet() {
  const fs = require('fs');
  const input = fs.readFileSync('/dev/stdin').toString().trim();
  console.log("Hello, " + input + "!");
}
greet();
`,
  python: `
def greet():
  import sys
  input = sys.stdin.read().strip()
  print("Hello, " + input + "!")

greet()
`,
  java: `
import java.util.Scanner;

public class HelloWorld {
  public static void main(String[] args) {
    Scanner scanner = new Scanner(System.in);
    String input = scanner.nextLine();
    System.out.println("Hello, " + input + "!");
  }
}
`,
  php: `
<?php
$input = trim(fgets(STDIN));
echo "Hello, " . $input . "!";
?>
`,
};
