package com.reelreview.service;


import com.reelreview.domain.board.Board;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class BoardService {


    public void asd(){
        Board board = new Board();
        board.setTitle("dd");
        board.setWriter("ss");
        board.setContent("asdsada");


    }

}
