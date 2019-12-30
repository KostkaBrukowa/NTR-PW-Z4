using Microsoft.AspNetCore;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.DependencyInjection;
using Z01.Models;

namespace Z4
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var host = CreateWebHostBuilder(args).Build();
            byte[] x = {1, 2};
            using (IServiceScope scope = host.Services.CreateScope())
            {
                var context = scope.ServiceProvider.GetRequiredService<MyContext>();

                context.Notes.Add(
                    new Note
                    {
                        Title = "First Author",
                        Description = "First descp",
                        RowVersion = x
                    }
                );
                context.Notes.Add(
                    new Note
                    {
                        Title = "Second Author",
                        Description = "Second descp",
                        RowVersion = x
                    }
                );
                context.Notes.Add(
                    new Note
                    {
                        Title = "Third Author",
                        Description = "Second descp",
                        RowVersion = x
                    }
                );
                context.Notes.Add(
                    new Note
                    {
                        Title = "Fourth Author",
                        Description = "Second descp",
                        RowVersion = x
                    }
                );

                context.SaveChanges();
            }

            host.Run();
        }

        public static IWebHostBuilder CreateWebHostBuilder(string[] args)
        {
            return WebHost.CreateDefaultBuilder(args)
                .UseStartup<Startup>();
        }
    }
}
