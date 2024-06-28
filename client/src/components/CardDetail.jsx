import React from 'react';

export default function CardDetail({spaceDetail}) {
    const handleClick = (e)=>{
        e.preventDefault();
    }
    return (
        <a className='w-full card_detail rounded-xl flex flex-col' href="" onClick={handleClick}>
            <img className='rounded-xl' src="https://images.unsplash.com/photo-1600431521340-491eca880813?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTB8fGxpYnJhcnl8ZW58MHx8MHx8fDA%3D" alt="space photo" />
            <ul className='p-5'>
                <li>{spaceDetail.name}</li>
                <li>Space Address</li>
                <li>6 personnes</li>
                <li>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi sequi labore esse corporis consequatur dolorum quas ducimus! Dolore nulla harum aperiam architecto recusandae atque nostrum unde qui praesentium ab. Totam?
                Ad delectus, officiis animi ex aut quam molestiae tempore nostrum, ducimus voluptatem praesentium! Cupiditate dolorum, nam pariatur numquam eveniet error necessitatibus perferendis odit reiciendis placeat impedit nulla modi quisquam inventore!
                Quos totam officiis animi excepturi doloribus, quod consequuntur eius possimus non iusto neque a, odio alias soluta voluptatum vel ratione, veritatis iure obcaecati maiores! Repellendus est a eligendi libero aliquam.
                Illum eaque reiciendis, fugiat amet explicabo nulla perferendis at similique minima provident magni a, ipsum quaerat consectetur mollitia maxime autem quibusdam hic doloremque aperiam necessitatibus dolor rerum dolorem? Recusandae, quod.
                Quo modi voluptas itaque possimus et cum optio sunt quibusdam quis, quae dicta dolores dolorem, odit magnam perspiciatis suscipit voluptatum praesentium doloremque corporis explicabo labore, recusandae aspernatur? Pariatur, exercitationem distinctio?
                Alias recusandae praesentium ipsum tempora neque exercitationem repellat error iste suscipit! Accusamus alias, rem exercitationem sint impedit at asperiores quidem reprehenderit dolores maxime vero nam possimus laborum, incidunt nulla modi!
                Corporis quasi natus vitae doloremque voluptatem commodi accusamus! Quasi reprehenderit error necessitatibus asperiores laudantium, nesciunt odit dolor, accusamus vitae, sequi perferendis ipsam tempora. Veniam dignissimos alias magnam rem, incidunt quia!
                Adipisci rem nisi voluptates voluptatem quis ut modi nam nostrum vero esse nesciunt maxime molestiae velit ullam, optio eius sapiente laudantium eos tempora? Optio sit at incidunt voluptatem recusandae blanditiis.
                Rem, dolor esse! Dolorem aspernatur fugit quas consequuntur libero rerum reprehenderit saepe fugiat, natus eum odit amet. Harum voluptates, dolor cumque exercitationem veritatis dolorum eos fugiat deserunt iusto excepturi laborum!
                Quas deserunt optio dolorem consequuntur at quia similique ipsam fugiat blanditiis ut labore hic, eaque quae omnis molestias repellat suscipit officiis reprehenderit eius rem quaerat nihil? Odit in tempore aspernatur!</li>

                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor magni blanditiis iste praesentium, excepturi obcaecati quo vel perferendis aspernatur quas harum nesciunt! Velit ut obcaecati, nostrum architecto ducimus facilis doloribus.
                Consequuntur voluptatum quos qui ex veritatis non eligendi alias obcaecati quibusdam doloremque, corporis, voluptate quo nihil eveniet assumenda molestiae laudantium debitis quaerat natus, repudiandae tenetur. Dolore adipisci ipsum voluptates unde.
                Amet repellat inventore sequi molestias provident tenetur rerum illo veniam recusandae ipsum ad rem hic ipsam placeat magni omnis nihil voluptatibus, tempore explicabo sapiente. Consectetur nemo nulla fuga ipsa natus.
                Officiis optio a magni ducimus asperiores autem sunt, officia fuga soluta corporis culpa amet! Laboriosam asperiores velit atque, repellat maiores perspiciatis nesciunt. Voluptas, quisquam quaerat atque neque tempore maiores modi.
                Architecto consequatur a distinctio eos. Dignissimos mollitia architecto explicabo, sint ipsa nemo odio doloremque ullam a maxime deserunt numquam dolorum nihil, cupiditate repudiandae. Itaque esse fugit ipsum error perferendis libero.
                Quisquam beatae facilis consequuntur fugit exercitationem illum, sequi minima, vitae, nihil ex expedita assumenda aut accusamus aspernatur. Ipsum laudantium totam rem aut quis illo veritatis? Corporis facere quis nam nobis?
                Debitis quo tempora consequatur fugit fuga molestiae nemo iure minus, adipisci a in quos ab enim, dolore sit consequuntur quibusdam cupiditate, praesentium dolores ex! Modi eaque voluptatum veritatis. Eum, temporibus.
                Sed optio delectus illum dignissimos minus vitae facilis tempora veniam praesentium itaque, maiores, dolores aliquid. Pariatur saepe sapiente eligendi sed beatae sit veniam rerum, excepturi consectetur temporibus fugit nesciunt labore.
                Praesentium, ab voluptatem molestias officia laborum nisi, ipsum voluptate ex rerum error dolore, tempora dignissimos magnam aliquam nihil voluptatibus sequi nesciunt nobis reiciendis illum laudantium vitae ea! Neque, quas impedit?
                Veritatis, esse ullam. Provident accusamus corrupti dignissimos nihil quo rem, mollitia molestias dolores temporibus, amet voluptatibus dicta animi distinctio officia consequuntur soluta minima accusantium, obcaecati non qui? Eum, ipsa obcaecati.</p>
            </ul>
        </a>  
    );
}