package com.reelreview;

import com.reelreview.Repo.Main.BoardRepository;
import com.reelreview.domain.board.Board;
import org.junit.jupiter.api.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;


import java.util.Collection;

@RunWith(SpringRunner.class)
@SpringBootTest
class ReelReviewApplicationTests {

    @Autowired
    private BoardRepository boardRepo;
    @Test
    public void testDelete() {

        System.out.println("DELETE Entity ====== ");
        boardRepo.deleteById(1L);
    }

    @Test
    public void testInsert200() {
        for (int i = 1; i <= 200; i++) {
            Board board = new Board();
            board.setTitle("제목.." + i);
            board.setContent("내용...." +  i + " 채우기 ");
            board.setWriter("user0" + (i%10) );
            boardRepo.save(board);
        }
    }


}




