using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography.X509Certificates;
using System.Text.Json;
using System.Threading;
using System.Timers;
using Microsoft.Extensions.Logging;

class Program
{
    static void Main(string[] args)
    {
        Console.WriteLine("Hello World!");

        var loggerFactory = LoggerFactory.Create(builder => { builder.AddConsole(); });

        var context = new MyDbContext(loggerFactory);
        context.Database.EnsureCreated();
        InitializeData(context);

        Console.WriteLine("All posts:");
        var data = context.BlogPosts.Select(x => x.Title).ToList();
        Console.WriteLine(JsonSerializer.Serialize(data));
            
            
        Console.WriteLine("How many comments each user left:");

        //------------------------MY FRIST QUERY------------------------------//

        var comments = context.BlogComments
            .GroupBy(comments => comments.UserName)
            .Select(users => new
            {
                User = users.Key,
                Count = users.Count(),
            });

        Console.WriteLine(JsonSerializer.Serialize(comments));

        //------------------------MY FRIST QUERY------------------------------//

        //ToDo: write a query and dump the data to console
        // Expected result (format could be different, e.g. object serialized to JSON is ok):
        // Ivan: 4
        // Petr: 2
        // Elena: 3

        Console.WriteLine("Posts ordered by date of last comment. Result should include text of last comment:");

        //------------------------MY SECOND QUERY------------------------------//

        var sortedPosts = context.BlogPosts
            .Select(post => new
            {
                post.Title,
                LastComment = post.Comments.OrderByDescending(u => u.CreatedDate).FirstOrDefault(),

            })
            .OrderByDescending(post => post.LastComment.CreatedDate)
            .Select(post => new
            {
                post.Title,
                post.LastComment.CreatedDate,
                post.LastComment.Text,
            });

        Console.WriteLine(JsonSerializer.Serialize(sortedPosts));

        //------------------------MY SECOND QUERY------------------------------//

        //ToDo: write a query and dump the data to console
        // Expected result (format could be different, e.g. object serialized to JSON is ok):
        // Post2: '2020-03-06', '4'
        // Post1: '2020-03-05', '8'
        // Post3: '2020-02-14', '9'


        Console.WriteLine("How many last comments each user left:");

        //------------------------MY THIRD QUERY------------------------------//

        var usersLastCommentsCount = context.BlogPosts

            .Select(post => new
            {
                LastComment = post.Comments.OrderByDescending(u => u.CreatedDate).FirstOrDefault(),
            })
            .GroupBy(post => post.LastComment.UserName)
            .Select(post => new
            {
                Name = post.Key,
                Count = post.Count()
            });

        Console.WriteLine(JsonSerializer.Serialize(usersLastCommentsCount));

        //------------------------MY THIRD QUERY------------------------------//

        // 'last comment' is the latest Comment in each Post
        //ToDo: write a query and dump the data to console
        // Expected result (format could be different, e.g. object serialized to JSON is ok):
        // Ivan: 2
        // Petr: 1
    }

    private static void InitializeData(MyDbContext context)
    {
        context.BlogPosts.Add(new BlogPost("Post1")
        {
            Comments = new List<BlogComment>()
            {
                new BlogComment("1", new DateTime(2020, 3, 2), "Petr"),
                new BlogComment("2", new DateTime(2020, 3, 4), "Elena"),
                new BlogComment("8", new DateTime(2020, 3, 5), "Ivan"),
            }
        });
        context.BlogPosts.Add(new BlogPost("Post2")
        {
            Comments = new List<BlogComment>()
            {
                new BlogComment("3", new DateTime(2020, 3, 5), "Elena"),
                new BlogComment("4", new DateTime(2020, 3, 6), "Ivan"),
            }
        });
        context.BlogPosts.Add(new BlogPost("Post3")
        {
            Comments = new List<BlogComment>()
            {
                new BlogComment("5", new DateTime(2020, 2, 7), "Ivan"),
                new BlogComment("6", new DateTime(2020, 2, 9), "Elena"),
                new BlogComment("7", new DateTime(2020, 2, 10), "Ivan"),
                new BlogComment("9", new DateTime(2020, 2, 14), "Petr"),
            }
        });
        context.SaveChanges();
    }
}