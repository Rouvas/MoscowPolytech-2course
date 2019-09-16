import java.util.*;
class lab1
{
  static Scanner reader = new Scanner(System.in);
  public static void main(String[]args)
  {
    int[]b = new int[reader.nextInt()];
    fill_arr(b);
    print_arr(b);
  }
  
  public static void fill_arr (int[]c)
  {
    for (int i=0; i<c.length; i++)
    {
      c[i]=(int)(10*Math.random());
      System.out.print(c[i]+" ");
    }
    System.out.println("Массив заполнен");
   }
  
  public static void print_arr(int[] t)
  {
    for (int i=0; i<t.length; i++)
    {
     System.out.print(t[i]+" ");
    }
    System.out.println();
  }
   
}